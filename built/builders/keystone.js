"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeystonePresenceBuilder = void 0;
const defaultPresence = () => new Object({
    st: 'chat',
    's.t': new Date().getTime(),
    m: '',
    's.p': 'keystone'
});
const defaultConfig = {
    mergeDefaultPresence: true
};
class KeystonePresenceBuilder {
    _config;
    constructor(config) {
        this._config = { ...defaultConfig, ...config };
        return this;
    }
    _buildDefaultPresence = () => this._config.mergeDefaultPresence
        ? typeof this._config.defaultPresence === 'function'
            ? { ...defaultPresence(), ...this._config.defaultPresence() }
            : { ...defaultPresence(), ...this._config.defaultPresence }
        : typeof this._config.defaultPresence === 'function'
            ? this._config.defaultPresence()
            : this._config.defaultPresence;
    _toXmlObject = () => new Object({ keystone: this._buildDefaultPresence() });
}
exports.KeystonePresenceBuilder = KeystonePresenceBuilder;
