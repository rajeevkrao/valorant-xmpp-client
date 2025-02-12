import { MapUrls } from "../content/maps";
import { QueueIds } from "../content/queues";
import { Ranks } from "../content/ranks";
export declare class ValorantPresenceBuilder {
    _presence: (() => ValorantPresenceObject) | ValorantPresenceObject;
    _config: ValorantPresenceBuilderConfig;
    constructor(config?: ValorantPresenceBuilderConfig);
    setPresence: (presence?: (() => ValorantPresenceObject) | ValorantPresenceObject) => this;
    _buildDefaultPresence: () => ValorantPresence;
    _buildDefaultPresenceObject: () => ValorantPresenceObject;
    _toJSON: (replacer?: (this: any, key: string, value: any) => any, space?: string | number) => string;
    _toBase64: () => string;
    _toXmlObject: () => Object;
}
type LoopStates = ('MENUS' | 'PREGAME' | 'INGAME') | (string & {});
type PartyState = ('DEFAULT' | 'MATCHMAKING' | 'MATCHMADE_GAME_STARTING' | 'CUSTOM_GAME_SETUP' | 'CUSTOM_GAME') | (string & {});
type PartyAccessibility = ('OPEN' | 'CLOSED') | (string & {});
type TeamName = ('Blue' | 'Red') | (string & {});
type CustomTeamName = ('TeamOne' | 'TeamTwo' | 'TeamSpectate' | 'TeamOneCoaches' | 'TeamTwoCoaches') | (string & {});
type ProvisioningFlow = ('Invalid' | 'Matchmaking') | (string & {});
interface ValorantPresenceBuilderConfig {
    defaultPresence?: (() => ValorantPresence) | ValorantPresence;
    mergeDefaultPresence?: boolean;
    mergeDefaultPresenceObject?: boolean;
}
interface ValorantPresence {
    st?: ('away' | 'chat') | (string & {});
    's.t'?: number;
    's.d'?: string;
    's.l'?: string;
    m?: string;
    's.a'?: string;
    p?: ValorantPresenceObject;
    's.p'?: ('valorant') | (string & {});
    [propName: string]: any;
}
interface ValorantPresenceObject {
    isValid?: boolean;
    sessionLoopState?: LoopStates;
    partyOwnerSessionLoopState?: LoopStates;
    customGameName?: string;
    customGameTeam?: CustomTeamName;
    partyOwnerMatchMap?: MapUrls;
    partyOwnerMatchCurrentTeam?: TeamName;
    partyOwnerMatchScoreAllyTeam?: number;
    partyOwnerMatchScoreEnemyTeam?: number;
    partyOwnerProvisioningFlow?: ProvisioningFlow;
    provisioningFlow?: ProvisioningFlow;
    matchMap?: MapUrls;
    partyId?: string;
    isPartyOwner?: boolean;
    partyState?: PartyState;
    partyAccessibility?: PartyAccessibility;
    maxPartySize?: number;
    queueId?: QueueIds;
    partyLFM?: boolean;
    partyClientVersion?: string;
    partySize?: number;
    tournamentId?: string;
    rosterId?: string;
    partyVersion?: number;
    queueEntryTime?: string;
    playerCardId?: string;
    playerTitleId?: string;
    preferredLevelBorderId?: string;
    accountLevel?: number;
    competitiveTier?: Ranks | number;
    leaderboardPosition?: number;
    isIdle?: boolean;
    [propName: string]: any;
}
export {};
