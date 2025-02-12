export declare class KeystonePresenceBuilder {
    _config: KeystonePresenceBuilderConfig;
    constructor(config?: KeystonePresenceBuilderConfig);
    _buildDefaultPresence: () => KeystonePresence;
    _toXmlObject: () => Object;
}
interface KeystonePresenceBuilderConfig {
    defaultPresence?: (() => KeystonePresence) | KeystonePresence;
    mergeDefaultPresence?: boolean;
}
interface KeystonePresence {
    st?: ('away' | 'chat') | (string & {});
    's.t'?: number;
    m?: string;
    's.p'?: ('keystone') | (string & {});
    [propName: string]: any;
}
export {};
