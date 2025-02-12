"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericRequest = void 0;
const axios_1 = require("axios");
class GenericRequest {
    url;
    method;
    headers;
    params;
    body;
    constructor() {
        return this;
    }
    setUrl(url) {
        this.url = url;
        return this;
    }
    setMethod(method) {
        this.method = method;
        return this;
    }
    setHeaders(headers) {
        this.headers = {
            ...this.headers,
            ...headers
        };
        return this;
    }
    setParams(params) {
        this.params = params;
        return this;
    }
    setBody(body) {
        this.body = body;
        return this;
    }
    async send(options) {
        return await (0, axios_1.default)({
            url: this.url,
            method: this.method,
            headers: this.headers,
            data: this.body,
            params: this.params,
            ...options
        });
    }
}
exports.GenericRequest = GenericRequest;
