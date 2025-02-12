import { UnknownValorantXmppError } from "./errors";
export declare class AuthFailure extends UnknownValorantXmppError {
    constructor(response: any, message?: string);
}
export declare class MissingArguments extends AuthFailure {
    constructor(response: any, message?: string);
}
export declare class InvalidRegion extends AuthFailure {
    constructor(response: any, message?: string);
}
export declare class InvalidCredentials extends AuthFailure {
    constructor(response: any);
}
export declare class Invalid2faCode extends AuthFailure {
    constructor(response: any);
}
