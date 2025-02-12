"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresenceBuilder = exports.KeystonePresenceBuilder = exports.ValorantPresenceBuilder = void 0;
const valorant_1 = require("./valorant");
Object.defineProperty(exports, "ValorantPresenceBuilder", { enumerable: true, get: function () { return valorant_1.ValorantPresenceBuilder; } });
const keystone_1 = require("./keystone");
Object.defineProperty(exports, "KeystonePresenceBuilder", { enumerable: true, get: function () { return keystone_1.KeystonePresenceBuilder; } });
const defaultConfig = {
    mergeDefaultPresenceObject: true,
    mergeGamesObject: true
};
const defaultPresence = (presenceCount) => new Object({
    '@_id': 'presence_' + presenceCount,
    show: 'chat',
    status: ''
});
class PresenceBuilder {
    _presenceCount;
    _config;
    _presence;
    _keystonePresence;
    _valorantPresence;
    get presenceCount() {
        if (typeof this._presenceCount === 'undefined')
            this._presenceCount = 0;
        this._presenceCount++;
        return this._presenceCount;
    }
    get keystonePresence() {
        if (!(this._keystonePresence instanceof keystone_1.KeystonePresenceBuilder))
            return undefined;
        return this._keystonePresence._toXmlObject();
    }
    get valorantPresence() {
        if (!(this._valorantPresence instanceof valorant_1.ValorantPresenceBuilder))
            return undefined;
        return this._valorantPresence._toXmlObject();
    }
    constructor(config) {
        this._config = { ...defaultConfig, ...config };
        return this;
    }
    addKeystonePresence = (presence) => {
        this._keystonePresence = presence;
        return this;
    };
    addValorantPresence = (presence) => {
        this._valorantPresence = presence;
        return this;
    };
    _buildDefaultPresence = () => this._config.mergeDefaultPresenceObject
        ? typeof this._config.defaultPresence === 'function'
            ? { ...defaultPresence(this.presenceCount), ...this._config.defaultPresence(this.presenceCount) }
            : { ...defaultPresence(this.presenceCount), ...this._config.defaultPresence }
        : typeof this._config.defaultPresence === 'function'
            ? this._config.defaultPresence(this.presenceCount)
            : this._config.defaultPresence;
    _buildPresenceObject = () => this._config.mergeGamesObject ? {
        ...this._buildDefaultPresence(),
        games: {
            ...this.keystonePresence,
            ...this.valorantPresence
        }
    } : this._buildDefaultPresence();
    _toXmlObject = () => new Object({ presence: this._buildPresenceObject() });
}
exports.PresenceBuilder = PresenceBuilder;
