"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValorantXmppClient = void 0;
const events_1 = require("events");
const valorant_auth_1 = require("./valorant-auth");
const xmpp_1 = require("./xmpp");
const xml_objects_1 = require("./xml-objects");
const presence_1 = require("./presence/presence");
const parsers_1 = require("../helpers/parsers");
const builders_1 = require("../builders/builders");
const friends_1 = require("./friends/friends");
const iq_1 = require("./iq/iq");
const defaultConfig = {
    autoReconnect: true,
    maxReconnectAttempts: 5,
    reconnectAttemptsTimeframe: 15000,
    updatePresenceInterval: 120000,
    autoAcceptIncomingRequests: true,
    verbose: false,
};
const defaultTokenStorage = {
    accessToken: null,
    pasToken: null,
    entitlementsToken: null,
    puuid: null,
    region: null,
    ssidCookie: null,
};
const defaultAccount = {
    jid: null,
    name: null,
    tagline: null,
    tokenStorage: null,
};
const buildConfig = (options) => new Object({ ...defaultConfig, ...options });
class ValorantXmppClient extends events_1.EventEmitter {
    _isReady;
    _isCloseRequested;
    _reconnects;
    _authInstance;
    _xmppInstance;
    _config;
    _presence;
    _presenceInterval;
    _account;
    friends;
    getXmppInstance = async () => new Promise((resolve) => {
        const onReady = () => {
            this.removeListener("ready", onReady);
            resolve(this._xmppInstance);
        };
        if (!this._isReady) {
            this.on("ready", onReady);
        }
        resolve(this._xmppInstance);
    });
    get presence() {
        if (typeof this._presence === "undefined" ||
            !(this._presence instanceof builders_1.PresenceBuilder))
            this.presence = new builders_1.PresenceBuilder().addKeystonePresence(new builders_1.KeystonePresenceBuilder());
        return this._presence;
    }
    set presence(presence) {
        this._presence = presence;
    }
    get tokenStorage() {
        return { ...defaultTokenStorage, ...this.account.tokenStorage };
    }
    set tokenStorage(tokenStorage) {
        this.account = { tokenStorage: { ...this.tokenStorage, ...tokenStorage } };
    }
    get account() {
        return { ...defaultAccount, ...this._account };
    }
    set account(account) {
        this._account = { ...this.account, ...account };
    }
    get reconnects() {
        this._reconnects = this._reconnects.filter((date) => date + this._config.reconnectAttemptsTimeframe > Date.now());
        return this._reconnects;
    }
    constructor(config) {
        super();
        this._isReady = false;
        this._isCloseRequested = false;
        this._config = buildConfig(config);
        this._reconnects = new Array();
    }
    async _handleData(type, data) {
        this.log({ type, data });
        switch (type) {
            case "presence":
                this.emit("presence", (0, presence_1.formatPresence)(data));
                break;
            case "message":
                this.emit("message", data);
                break;
            case "iq":
                const iq = (0, iq_1.formatIq)(data);
                this.emit("iq", data);
                if (iq.queryType === "jabber:iq:riotgames:roster") {
                    if (iq.type === "result") {
                        const items = iq.query.item;
                        const roster = (0, friends_1.formatRoster)(data);
                        this.friends = roster.roster;
                        if (this._config.autoAcceptIncomingRequests)
                            await this.acceptAllFriendRequests();
                        this.emit("roster", roster.roster);
                    }
                    if (iq.type === "set") {
                        const item = iq.query.item;
                        if (item.subscription === "pending_in") {
                            if (this._config.autoAcceptIncomingRequests)
                                await this.sendFriendRequest(item.id.name, item.id.tagline);
                            this.emit("incomingRequest", data);
                        }
                    }
                }
                // if(roster.type === 'result')
                //     this.friends = roster.roster;
                // else if (roster.type === 'set') {
                //     if(typeof this.friends === 'undefined')
                //         throw new Error('friends list is undefined, did you forget to await somewhere?');
                //     // if(this.friends === null)
                // }
                // else throw new Error('unknown type');
                break;
        }
    }
    async _mainLoop() {
        try {
            this._presenceInterval = setInterval(async () => {
                await this.sendPresence();
            }, typeof this._config.updatePresenceInterval === "number"
                ? this._config.updatePresenceInterval
                : this._config.updatePresenceInterval());
            while (true) {
                const responses = Object.entries(await this._xmppInstance.readXml());
                for (const response of responses) {
                    const [type, data] = response;
                    if (Array.isArray(data))
                        for (const xmlObj of data)
                            this._handleData(type, xmlObj);
                    else
                        this._handleData(type, data);
                }
            }
        }
        catch (err) {
            this._isReady = false;
            // condition - so that if statement isn't enormous
            const isError = err.type === "error" &&
                (err.error.code === "EPIPE" || err.error.code === "ECONNRESET");
            // stop sending presence
            clearInterval(this._presenceInterval);
            // if an error was thrown destroy the instance
            if (isError || (err.type === "close" && err.hadError))
                this._xmppInstance.destroy();
            this._authInstance.destroy();
            if (this.reconnects.length > this._config.maxReconnectAttempts)
                return this.emit("error", new Error("There have been too many reconnects within specified timeframe."));
            // this disconnect was intentional so don't reconnect/throw error
            if (this._isCloseRequested)
                return;
            // if we have auto reconnect enabled and the connection was closed try reconnecting
            if (this._config?.autoReconnect && (err.type === "close" || isError))
                return await this.login();
            this.emit("error", err);
        }
    }
    async login(options) {
        this.reconnects.push(Date.now());
        this._authInstance = new valorant_auth_1.ValorantAuth(this, this._config?.authConfig);
        await this._authInstance.login(options);
        // connect to xmpp
        this._xmppInstance = await new xmpp_1.XmppClient().connect({
            port: 5223,
            host: `${this.tokenStorage.region.affinity}.chat.si.riotgames.com`,
        });
        // send declaration
        await this._xmppInstance.send((0, xml_objects_1.xmlDeclaration)(this.tokenStorage.region).replace(/\s\s+/gi, ""));
        // read declaration and mechanism request
        if (typeof xmpp_1.XmppClient.parseXml(await this._xmppInstance.read())["stream:features"] === "undefined")
            await this._xmppInstance.read();
        // send mechanism
        await this._xmppInstance.sendXml((0, xml_objects_1.mechanism)(this.tokenStorage.accessToken, this.tokenStorage.pasToken));
        // check if auth was succesful
        const { success } = await this._xmppInstance.readXml();
        if (typeof success === "undefined")
            throw new Error("auth error");
        await this._xmppInstance.send((0, xml_objects_1.xmlDeclaration)(this.tokenStorage.region).replace(/\s\s+/gi, ""));
        if (typeof xmpp_1.XmppClient.parseXml(await this._xmppInstance.read())["stream:features"] === "undefined")
            await this._xmppInstance.read();
        await this._xmppInstance.sendXml((0, xml_objects_1.clientName)());
        const { jid } = (await this._xmppInstance.readXml()).iq.bind;
        this.account = { jid: { jid, ...(0, parsers_1.parseJid)(jid) } };
        await this._xmppInstance.sendXml((0, xml_objects_1.rxep)());
        await this._xmppInstance.read();
        await this._xmppInstance.sendXml((0, xml_objects_1.setupSession)());
        const { name, tagline } = (await this._xmppInstance.readXml()).iq.session
            .id;
        this.account = { name, tagline };
        await this.sendPresence();
        await this._xmppInstance.sendXml((0, xml_objects_1.fetchFriends)());
        this.emit("ready");
        this._isReady = true;
        this._mainLoop();
    }
    sendPresence = async () => (await this.getXmppInstance()).send(xmpp_1.XmppClient.buildXml(this.presence._toXmlObject()));
    fetchFriends = async () => {
        await (await this.getXmppInstance()).sendXml((0, xml_objects_1.fetchFriends)());
        return this.friends;
    };
    sendFriendRequest = async (name, tagline) => {
        await (await this.getXmppInstance()).sendXml((0, xml_objects_1.sendFriendRequest)(name, tagline));
    };
    acceptAllFriendRequests = async () => {
        const friends = this.friends.filter((friend) => friend.isIncoming);
        for (const friend of friends)
            await (await this.getXmppInstance()).sendXml((0, xml_objects_1.sendFriendRequest)(friend.name, friend.tagline));
    };
    removeAllSentRequests = async () => {
        const friends = this.friends.filter((friend) => friend.isOutgoing);
        for (const friend of friends)
            await (await this.getXmppInstance()).sendXml((0, xml_objects_1.removeOutgoingFriendRequest)(friend.jid.jid));
    };
    end = () => {
        this._isCloseRequested = true;
        this._xmppInstance.end();
        this.removeAllListeners();
    };
    log = (message) => {
        if (this._config.verbose)
            console.log(message);
    };
}
exports.ValorantXmppClient = ValorantXmppClient;
