/// <reference types="node" />
/// <reference types="node" />
import { EventEmitter } from "events";
import { CookieAuth, PasswordAuth, TokenAuth, TokenStorage, ValorantAuth, ValorantAuthConfig } from "./valorant-auth";
import { XmppClient } from "./xmpp";
import { PresenceOutput } from "./presence/presence";
import { Jid } from "../helpers/parsers";
import { PresenceBuilder } from "../builders/builders";
import { RosterOutput } from "./friends/friends";
import { IqOutput } from "./iq/iq";
export declare class ValorantXmppClient extends EventEmitter {
    _isReady: boolean;
    _isCloseRequested: boolean;
    _reconnects: Array<number>;
    _authInstance: ValorantAuth;
    _xmppInstance: XmppClient;
    _config: ValorantXmppConfig;
    _presence: PresenceBuilder;
    _presenceInterval: NodeJS.Timer;
    _account: Account;
    friends: Array<Friend>;
    getXmppInstance: () => Promise<XmppClient>;
    get presence(): PresenceBuilder;
    set presence(presence: PresenceBuilder);
    get tokenStorage(): {
        accessToken?: string;
        pasToken?: string;
        entitlementsToken?: string;
        puuid?: string;
        region?: import("../helpers/endpoints").XmppRegionObject;
        ssidCookie?: string;
    };
    set tokenStorage(tokenStorage: {
        accessToken?: string;
        pasToken?: string;
        entitlementsToken?: string;
        puuid?: string;
        region?: import("../helpers/endpoints").XmppRegionObject;
        ssidCookie?: string;
    });
    get account(): {
        jid?: JidObject;
        name?: string;
        tagline?: string;
        tokenStorage?: TokenStorage;
    };
    set account(account: {
        jid?: JidObject;
        name?: string;
        tagline?: string;
        tokenStorage?: TokenStorage;
    });
    get reconnects(): number[];
    constructor(config?: ValorantXmppConfig);
    _handleData(type: string, data: any): Promise<void>;
    _mainLoop(): Promise<boolean | void>;
    login(options?: PasswordAuth | TokenAuth | CookieAuth): Promise<void>;
    sendPresence: () => Promise<unknown>;
    fetchFriends: () => Promise<Friend[]>;
    sendFriendRequest: (name: string, tagline: string) => Promise<void>;
    acceptAllFriendRequests: () => Promise<void>;
    removeAllSentRequests: () => Promise<void>;
    end: () => void;
    log: (message: any) => void;
}
interface ValorantXmppClientEvents {
    ready: () => void;
    presence: (presence: PresenceOutput) => void;
    message: (message: any) => void;
    incomingRequest: (data: any) => void;
    iq: (iq: IqOutput) => void;
    roster: (roster: RosterOutput) => void;
    error: (error: Error) => void;
}
export declare interface ValorantXmppClient {
    on<U extends keyof ValorantXmppClientEvents>(event: U, listener: ValorantXmppClientEvents[U]): this;
    once<U extends keyof ValorantXmppClientEvents>(event: U, listener: ValorantXmppClientEvents[U]): this;
    emit<U extends keyof ValorantXmppClientEvents>(event: U, ...args: Parameters<ValorantXmppClientEvents[U]>): boolean;
}
export interface JidObject extends Jid {
    jid: string;
}
interface ValorantXmppConfig {
    autoReconnect?: boolean;
    maxReconnectAttempts?: number;
    reconnectAttemptsTimeframe?: number;
    authConfig?: ValorantAuthConfig;
    updatePresenceInterval?: number | Function;
    autoAcceptIncomingRequests?: boolean;
    verbose?: boolean;
}
interface Account {
    jid?: JidObject;
    name?: string;
    tagline?: string;
    tokenStorage?: TokenStorage;
}
export interface Friend {
    jid?: JidObject;
    puuid?: string;
    name?: string;
    tagline?: string;
    lolName?: string;
    preferredName?: string;
    isFriend?: boolean;
    isIncoming?: boolean;
    isOutgoing?: boolean;
}
export {};
