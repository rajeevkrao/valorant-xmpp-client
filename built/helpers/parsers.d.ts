export declare const parseJid: (jid: string) => Jid;
export declare const parseLastOnline: (dateString: string) => Date;
export interface Jid {
    local?: string;
    domain: string;
    resource?: string;
}
