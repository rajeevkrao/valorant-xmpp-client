"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.UnknownValorantXmppError = void 0;
class UnknownValorantXmppError extends Error {
    response;
    constructor(response, message = 'Unknown valorant xmpp error! Please open an issue or DM ev3nvy#9996 on discord.') {
        super(message);
        this.name = this.constructor.name;
        this.response = response;
    }
}
exports.UnknownValorantXmppError = UnknownValorantXmppError;
exports.Auth = require("./auth");
