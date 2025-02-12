import { AxiosRequestConfig } from "axios";
export declare class Authorization {
    static createSession: (options: any, headers?: any, axiosConfig?: AxiosRequestConfig) => Promise<import("axios").AxiosResponse<any, any>>;
    static login: (cookie: string, username: string, password: string, language?: string, remember?: boolean, options?: any) => Promise<import("axios").AxiosResponse<any, any>>;
    static send2faCode: (cookie: string, code: string, rememberDevice?: boolean, options?: any) => Promise<import("axios").AxiosResponse<any, any>>;
    static fetchEntitlements: (accessToken: string) => Promise<import("axios").AxiosResponse<any, any>>;
    static fetchPas: (accessToken: string) => Promise<import("axios").AxiosResponse<any, any>>;
}
