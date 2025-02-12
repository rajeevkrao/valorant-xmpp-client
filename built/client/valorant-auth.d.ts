/// <reference types="node" />
import { AxiosRequestConfig } from "axios";
import { XmppRegionObject } from "../helpers/endpoints";
import { ValorantXmppClient } from "./valorant-xmpp";
export declare class ValorantAuth {
    _xmppClientInstance: ValorantXmppClient;
    _config: ValorantAuthConfig;
    _reauthInterval: NodeJS.Timer;
    get tokenStorage(): {
        accessToken?: string;
        pasToken?: string;
        entitlementsToken?: string;
        puuid?: string;
        region?: XmppRegionObject;
        ssidCookie?: string;
    };
    set tokenStorage(tokenStorage: {
        accessToken?: string;
        pasToken?: string;
        entitlementsToken?: string;
        puuid?: string;
        region?: XmppRegionObject;
        ssidCookie?: string;
    });
    constructor(client: ValorantXmppClient, config?: ValorantAuthConfig);
    _initWithUsernamePassword: ({ username, password }: PasswordAuth) => Promise<void>;
    _initWithAccessToken: ({ accessToken, pasToken, entitlementsToken }: TokenAuth) => Promise<void>;
    _initWithCookie: ({ ssidCookie }: CookieAuth) => Promise<void>;
    _reauth: () => Promise<void>;
    login(options?: PasswordAuth | TokenAuth | CookieAuth): Promise<this>;
    destroy(): void;
}
export interface TokenStorage {
    accessToken?: string;
    pasToken?: string;
    entitlementsToken?: string;
    puuid?: string;
    region?: XmppRegionObject;
    ssidCookie?: string;
}
export interface ValorantAuthConfig {
    /**
     * if not defined, it is determined automatically
     */
    region?: XmppRegionObject;
    /**
     * function that gets executed when/if 2fa is triggered
     * @warning has no effect unless you use username/password login
     */
    custom2faLogic?: Function;
    /**
     * custom json body for POST `auth.riotgames.com/api/v1/authorization`
     */
    sessionAuthBody?: SessionAuthBody;
    /**
     * additional options you can pass through to axios
     * @warning affects all of the non-xmpp endpoints
     */
    axiosConfig?: AxiosRequestConfig;
    /**
     * whether to automatically reauthenticate before token expiration (every 55 min)
     * @warning token auth does not support reauth since it's impossible to obtain new tokens
     */
    automaticReauth?: boolean;
}
export interface CookieAuth {
    ssidCookie: string;
}
export interface PasswordAuth {
    username: string;
    password: string;
}
/**
 * @warning this auth method does not support reauth and reconnect since it's impossible to obtain new tokens
 */
export interface TokenAuth {
    accessToken: string;
    pasToken?: string;
    entitlementsToken?: string;
}
interface SessionAuthBody {
    client_id: 'play-valorant-web-prod' | (string & {});
    nonce: string | number;
    redirect_uri: 'https://playvalorant.com/opt_in' | (string & {});
    response_mode?: ('query' | 'fragment') | (string & {});
    response_type: ('code' | 'token' | 'id_token' | 'token id_token' | 'code id_token' | 'code id_token token') | (string & {});
    scope?: 'account openid' | (string & {});
    [propName: string]: any;
}
export {};
