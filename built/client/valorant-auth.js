"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValorantAuth = void 0;
const readline_1 = require("readline");
const errors_1 = require("../errors/errors");
const endpoints_1 = require("../helpers/endpoints");
const authorization_1 = require("../helpers/authorization");
const { InvalidCredentials, AuthFailure, Invalid2faCode, MissingArguments, InvalidRegion } = errors_1.Auth;
let _stdin;
const stdin = () => {
    if (typeof _stdin === 'undefined')
        _stdin = (0, readline_1.createInterface)({ input: process.stdin, output: process.stdout });
    return _stdin;
};
// 2fa logic -> fetch from standard input aka console
const input2faCode = (login) => new Promise(resolve => stdin().question(`You have 2fa enabled, please input the 2fa code (sent to ${login.multifactor.email}):`, code => resolve(code)));
const defaultOptions = {
    custom2faLogic: input2faCode,
    sessionAuthBody: {
        client_id: "play-valorant-web-prod",
        nonce: 1,
        redirect_uri: "https://playvalorant.com/opt_in",
        response_type: "token id_token",
        response_mode: "query",
        scope: "account openid"
    },
    automaticReauth: true
};
const buildOptions = (options) => new Object({ ...defaultOptions, ...options });
const isPasswordAuth = (options) => options.username !== undefined && options.password !== undefined;
const isTokenAuth = (options) => options.accessToken !== undefined;
const isCookieAuth = (options) => options.ssidCookie !== undefined;
class ValorantAuth {
    _xmppClientInstance;
    _config;
    _reauthInterval;
    get tokenStorage() {
        return this._xmppClientInstance.tokenStorage;
    }
    set tokenStorage(tokenStorage) {
        this._xmppClientInstance.tokenStorage = {
            ...this.tokenStorage,
            ...tokenStorage
        };
    }
    constructor(client, config) {
        this._xmppClientInstance = client;
        this._config = buildOptions(config);
        return this;
    }
    _initWithUsernamePassword = async ({ username, password }) => {
        // initial request required for creating a session
        const session = await authorization_1.Authorization.createSession(this._config.sessionAuthBody, undefined, this._config.axiosConfig);
        let asidCookie = session.headers['set-cookie'].find((cookie) => /^asid/.test(cookie));
        // attempt to exchange username and password for an access token
        const login = (await authorization_1.Authorization.login(asidCookie, username, password));
        // auth failed - most likely incorrect login info
        if (typeof login.data.error !== 'undefined') {
            if (login.data.error === 'auth_failure')
                throw new InvalidCredentials(login);
            throw new AuthFailure(login);
        }
        asidCookie = login.headers['set-cookie'].find((cookie) => /^asid/.test(cookie));
        // check if 2fa is enabled and ask for code
        const response = login.data.type === 'multifactor'
            ? (await authorization_1.Authorization.send2faCode(asidCookie, await this._config.custom2faLogic(login.data)))
            : login;
        // auth failed - most likely invalid code
        if (typeof response.data.error !== 'undefined') {
            if (response.data.error === 'auth_failure')
                throw new Invalid2faCode(response);
            throw new AuthFailure(response);
        }
        // extract ssid cookie
        this.tokenStorage = {
            ssidCookie: response.headers['set-cookie'].find((cookie) => /^ssid/.test(cookie))
        };
        // extract tokens from the url
        const loginResponseURI = new URL(response.data.response.parameters.uri);
        const accessToken = loginResponseURI.searchParams.get('access_token');
        return await this._initWithAccessToken({ accessToken });
    };
    _initWithAccessToken = async ({ accessToken, pasToken, entitlementsToken }) => {
        this.tokenStorage = {
            accessToken,
            pasToken: typeof pasToken === 'undefined'
                ? (await authorization_1.Authorization.fetchPas(accessToken)).data
                : pasToken,
            /* entitlementsToken: typeof entitlementsToken === 'undefined'
                ? (await Authorization.fetchEntitlements(accessToken)).data.entitlements_token
                : entitlementsToken */
        };
        // decode the pas token
        const decodedJwt = JSON.parse(Buffer.from(this.tokenStorage.pasToken.split('.')[1], 'base64').toString());
        // get puuid
        this.tokenStorage = { puuid: decodedJwt.sub };
        // try automatically determening the region 
        if (typeof this._config.region === 'undefined') {
            // find region
            for (const region in endpoints_1.XmppRegions) {
                if (endpoints_1.XmppRegions[region].lookupName === decodedJwt.affinity) {
                    this.tokenStorage = { region: endpoints_1.XmppRegions[region] };
                    break;
                }
            }
            if (typeof this.tokenStorage.region == 'undefined')
                throw new InvalidRegion(decodedJwt);
        }
        else
            this.tokenStorage = { region: this._config.region };
    };
    _initWithCookie = async ({ ssidCookie }) => {
        const session = await authorization_1.Authorization.createSession(this._config.sessionAuthBody, { Cookie: ssidCookie }, this._config.axiosConfig);
        this.tokenStorage = {
            ssidCookie: session.headers['set-cookie'].find((cookie) => /^ssid/.test(cookie))
        };
        const loginResponseURI = new URL(session.data.response.parameters.uri);
        const accessToken = loginResponseURI.searchParams.get('access_token');
        return await this._initWithAccessToken({ accessToken });
    };
    _reauth = async () => {
        const session = await authorization_1.Authorization.createSession(this._config.sessionAuthBody, { Cookie: this.tokenStorage.ssidCookie }, this._config.axiosConfig);
        const loginResponseURI = new URL(session.data.response.parameters.uri);
        const accessToken = loginResponseURI.searchParams.get('access_token');
        this.tokenStorage = {
            accessToken,
            ssidCookie: session.headers['set-cookie'].find((cookie) => /^ssid/.test(cookie)),
            pasToken: (await authorization_1.Authorization.fetchPas(accessToken)).data
        };
    };
    async login(options) {
        if (typeof options !== 'undefined') {
            if (isCookieAuth(options))
                await this._initWithCookie(options);
            else if (isPasswordAuth(options))
                await this._initWithUsernamePassword(options);
            else if (isTokenAuth(options))
                await this._initWithAccessToken(options);
            else
                throw new MissingArguments(options);
        }
        if (this._config.automaticReauth)
            this._reauthInterval = setInterval(async () => await this._reauth(), (3600 - 300) * 1000);
        return this;
    }
    destroy() {
        clearInterval(this._reauthInterval);
    }
}
exports.ValorantAuth = ValorantAuth;
