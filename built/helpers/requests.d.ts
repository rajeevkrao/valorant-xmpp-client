import { AxiosRequestConfig, Method } from 'axios';
export declare class GenericRequest {
    url: string;
    method: Method;
    headers: any;
    params: any | URLSearchParams;
    body: any;
    constructor();
    setUrl(url: string): this;
    setMethod(method: Method): this;
    setHeaders(headers: any): this;
    setParams(params: any | URLSearchParams): this;
    setBody(body: any): this;
    send(options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<any, any>>;
}
