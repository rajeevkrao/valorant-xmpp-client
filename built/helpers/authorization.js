"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorization = void 0;
const https_1 = require("https");
const endpoints_1 = require("./endpoints");
const requests_1 = require("./requests");
// instead of ciphers, a custom axios adapter can be created that
// exposes https options, where you can set custom signature
// algorithms, and by not including sha1 we get past 1020 error
const ciphers = [
    "TLS_CHACHA20_POLY1305_SHA256",
    "TLS_AES_128_GCM_SHA256",
    "TLS_AES_256_GCM_SHA384"
];
const agent = new https_1.Agent({ ciphers: ciphers.join(':'), honorCipherOrder: true, minVersion: 'TLSv1.2' });
class Authorization {
    static createSession = (options, headers, axiosConfig) => new requests_1.GenericRequest()
        .setUrl(endpoints_1.Endpoints.Auth() + '/api/v1/authorization')
        .setMethod('POST')
        .setHeaders({
        'User-Agent': 'RiotClient/43.0.1.4195386.4190634 rso-auth (Windows; 10;;Professional, x64)',
        ...headers
    })
        .setBody({
        ...options
    })
        .send({
        httpsAgent: agent,
        ...axiosConfig
    });
    static login = (cookie, username, password, language = 'en_US', remember = false, options) => new requests_1.GenericRequest()
        .setUrl(endpoints_1.Endpoints.Auth() + '/api/v1/authorization')
        .setMethod('PUT')
        .setHeaders({
        Cookie: cookie,
        'User-Agent': 'RiotClient/43.0.1.4195386.4190634 rso-auth (Windows; 10;;Professional, x64)'
    })
        .setBody({
        type: 'auth',
        username,
        password,
        language,
        remember,
        ...options
    })
        .send({
        httpsAgent: agent
    });
    static send2faCode = (cookie, code, rememberDevice = true, options) => new requests_1.GenericRequest()
        .setUrl(endpoints_1.Endpoints.Auth() + '/api/v1/authorization')
        .setMethod('PUT')
        .setHeaders({
        Cookie: cookie,
        'User-Agent': 'RiotClient/43.0.1.4195386.4190634 rso-auth (Windows; 10;;Professional, x64)'
    })
        .setBody({
        type: 'multifactor',
        code,
        rememberDevice,
        ...options
    })
        .send({
        httpsAgent: agent
    });
    static fetchEntitlements = (accessToken) => new requests_1.GenericRequest()
        .setUrl(endpoints_1.Endpoints.Entitlements())
        .setMethod('POST')
        .setHeaders({
        Authorization: `Bearer ${accessToken}`
    })
        .setBody({})
        .send();
    static fetchPas = (accessToken) => new requests_1.GenericRequest()
        .setUrl(endpoints_1.Endpoints.Pas() + '/pas/v1/service/chat')
        .setMethod('GET')
        .setHeaders({
        Authorization: `Bearer ${accessToken}`
    })
        .send();
}
exports.Authorization = Authorization;
