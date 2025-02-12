import { JidObject } from "../valorant-xmpp";
export declare const formatPresence: (presence: PresenceInput) => PresenceOutput;
export interface PresenceInput {
    from?: string;
    to?: string;
    show?: string;
    type?: string;
    games?: any;
    status?: string;
    last_online?: string;
    id?: string;
    [propName: string]: any;
}
export interface PresenceOutput {
    sender: JidObject;
    recipient: JidObject;
    status: string | null;
    statusMessage: string | null;
    gamePresence: any | null;
    last_online: Date | null;
    type: string | null;
    id: string | null;
    [propName: string]: any;
}
