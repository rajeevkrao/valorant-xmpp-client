/// <reference types="node" />
/// <reference types="node" />
import { Socket } from "net";
import { ConnectionOptions } from "tls";
export declare class XmppClient {
    _socket: Socket;
    _dataChunk: Buffer;
    constructor();
    connect: (options: ConnectionOptions) => Promise<XmppClient>;
    send: (data: any) => Promise<unknown>;
    sendXml: (data: any) => Promise<unknown>;
    read: () => Promise<any>;
    readXml: () => Promise<any>;
    readMultiple: (count: number) => Promise<void>;
    destroy: () => void;
    end: () => void;
    static buildXml: (data: any) => any;
    static parseXml: (data: any) => any;
    static validateXml: (data: any) => true | import("fast-xml-parser").ValidationError;
}
