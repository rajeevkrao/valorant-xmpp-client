"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmppClient = void 0;
const tls_1 = require("tls");
const fast_xml_parser_1 = require("fast-xml-parser");
const defaultBuilderOptions = {
    ignoreAttributes: false,
    suppressBooleanAttributes: false,
    suppressEmptyNode: true,
    suppressUnpairedNode: true,
};
const xmlBuilder = new fast_xml_parser_1.XMLBuilder(defaultBuilderOptions);
const defaultParserOptions = {
    ignoreAttributes: false,
    suppressEmptyNode: true,
    suppressUnpairedNode: true,
    attributeNamePrefix: ''
};
const xmlParser = new fast_xml_parser_1.XMLParser(defaultParserOptions);
class XmppClient {
    _socket;
    _dataChunk;
    constructor() {
        return this;
    }
    connect = (options) => {
        this._socket = (0, tls_1.connect)(options);
        this._socket.setKeepAlive(true);
        this._dataChunk = Buffer.from('');
        return new Promise((resolve, reject) => {
            // clean up prevous event listeners
            const cleanupListeners = () => {
                this._socket.removeListener('ready', handleReady);
                this._socket.removeListener('error', handleError);
            };
            // define handlers
            const handleReady = () => {
                cleanupListeners();
                return resolve(this);
            };
            const handleError = (error) => {
                cleanupListeners();
                return reject({ type: 'error', error });
            };
            this._socket.once('error', handleError);
            this._socket.once('ready', handleReady);
        });
    };
    send = (data) => new Promise((resolve, reject) => {
        // console.log(`OUT | ${data}`);
        // clean up prevous event listeners
        const cleanupListeners = () => {
            this._socket.removeListener('data', writeData);
            this._socket.removeListener('error', handleError);
            this._socket.removeListener('close', handleClose);
        };
        // define handlers
        const writeData = () => {
            cleanupListeners();
            return resolve(null);
        };
        const handleError = (error) => {
            cleanupListeners();
            return reject({ type: 'error', error });
        };
        const handleClose = (hadError) => {
            cleanupListeners();
            return reject({ type: 'close', hadError });
        };
        this._socket.once('error', handleError);
        this._socket.once('close', handleClose);
        this._socket.write(data, writeData);
    });
    sendXml = (data) => this.send(xmlBuilder.build(data));
    read = () => new Promise((resolve, reject) => {
        // clean up prevous event listeners
        const cleanupListeners = () => {
            this._socket.removeListener('data', handleData);
            this._socket.removeListener('timeout', handleTimeout);
            this._socket.removeListener('error', handleError);
            this._socket.removeListener('close', handleClose);
        };
        // define handlers
        const handleData = (data) => {
            // console.log(`IN | ${data}`);
            cleanupListeners();
            return resolve(data);
        };
        const handleTimeout = () => {
            cleanupListeners();
            return reject({ type: 'timeout' });
        };
        const handleError = (error) => {
            cleanupListeners();
            return reject({ type: 'error', error });
        };
        const handleClose = (hadError) => {
            cleanupListeners();
            return reject({ type: 'close', hadError });
        };
        this._socket.once('timeout', handleTimeout);
        this._socket.once('error', handleError);
        this._socket.once('close', handleClose);
        this._socket.on('data', handleData);
    });
    readXml = async () => {
        this._dataChunk = Buffer.from('');
        // large data such as presences can be sent in multiple byte chunks
        // so we handle that
        do {
            const data = await this.read();
            this._dataChunk = Buffer.concat([this._dataChunk, data], this._dataChunk.length + data.length);
            // this xml validator throws an error with multiple xml root elements
            // because xml structures with multiple root elements aren't valid
            // and there is no option to disable this check - so we just wrap the
            // structure with some random tag
        } while (XmppClient.validateXml('<lmao>' + this._dataChunk.toString() + '</lmao>') !== true);
        return xmlParser.parse(this._dataChunk);
    };
    readMultiple = async (count) => {
        while (count > 0) {
            await this.read();
            count--;
        }
    };
    destroy = () => {
        this._socket.destroy();
        this._socket.removeAllListeners();
    };
    end = () => {
        this._socket.end();
        this._socket.removeAllListeners();
    };
    static buildXml = (data) => xmlBuilder.build(data);
    static parseXml = (data) => xmlParser.parse(data);
    static validateXml = (data) => fast_xml_parser_1.XMLValidator.validate(data);
}
exports.XmppClient = XmppClient;
