"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invalid2faCode = exports.InvalidCredentials = exports.InvalidRegion = exports.MissingArguments = exports.AuthFailure = void 0;
const errors_1 = require("./errors");
class AuthFailure extends errors_1.UnknownValorantXmppError {
    constructor(response, message = 'Unknown login error! Please open an issue or DM ev3nvy#9996 on discord.') {
        super(response, message);
        this.name = this.constructor.name;
    }
}
exports.AuthFailure = AuthFailure;
class MissingArguments extends AuthFailure {
    constructor(response, message = 'Not all arguments were given.') {
        super(response, message);
        this.name = this.constructor.name;
    }
}
exports.MissingArguments = MissingArguments;
class InvalidRegion extends AuthFailure {
    constructor(response, message = 'Region could not be determined automatically! Please open an issue or DM ev3nvy#9996 on discord.') {
        super(response, message);
        this.name = this.constructor.name;
    }
}
exports.InvalidRegion = InvalidRegion;
class InvalidCredentials extends AuthFailure {
    constructor(response) {
        super(response, 'Username + password combination is incorrect.');
        this.name = this.constructor.name;
    }
}
exports.InvalidCredentials = InvalidCredentials;
class Invalid2faCode extends AuthFailure {
    constructor(response) {
        super(response, '2FA code is invalid.');
        this.name = this.constructor.name;
    }
}
exports.Invalid2faCode = Invalid2faCode;
