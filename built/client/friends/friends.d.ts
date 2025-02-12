import { JidObject } from "../valorant-xmpp";
export declare const formatRoster: (presence: RosterInput) => RosterOutput;
export interface RosterInput {
    from?: string;
    to?: string;
    type?: ('result' | 'set') | (string & {});
    query?: any;
    id?: string;
    [propName: string]: any;
}
export interface RosterOutput {
    sender: JidObject;
    recipient: JidObject;
    type: ('result' | 'set') | (string & {}) | null;
    id: string | null;
    [propName: string]: any;
}
