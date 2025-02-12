import { ValorantPresenceBuilder } from './valorant';
import { KeystonePresenceBuilder } from './keystone';
export { ValorantPresenceBuilder, KeystonePresenceBuilder };
export declare class PresenceBuilder {
    _presenceCount: number;
    _config: PresenceBuilderConfig;
    _presence: Presence;
    _keystonePresence: KeystonePresenceBuilder;
    _valorantPresence: ValorantPresenceBuilder;
    get presenceCount(): number;
    get keystonePresence(): Object;
    get valorantPresence(): Object;
    constructor(config?: PresenceBuilderConfig);
    addKeystonePresence: (presence: KeystonePresenceBuilder) => this;
    addValorantPresence: (presence: ValorantPresenceBuilder) => this;
    _buildDefaultPresence: () => Presence;
    _buildPresenceObject: () => Presence;
    _toXmlObject: () => Object;
}
interface PresenceBuilderConfig {
    defaultPresence?: ((presenceCount?: number) => Presence) | Presence;
    mergeDefaultPresenceObject?: boolean;
    mergeGamesObject?: boolean;
}
interface Presence {
    '@_id'?: string;
    show?: ('chat' | 'away' | 'dnd' | 'mobile') | (string & {});
    status?: string;
    games?: any;
}
