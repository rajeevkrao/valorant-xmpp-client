"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValorantPresenceBuilder = void 0;
const ranks_1 = require("../content/ranks");
const defaultPresence = () => new Object({
    st: 'chat',
    's.t': new Date().getTime(),
    's.d': '',
    's.l': '',
    m: '',
    's.a': '',
    's.p': 'valorant'
});
const defaultConfig = {
    mergeDefaultPresence: true,
    mergeDefaultPresenceObject: true
};
const defaultPresenceObject = () => new Object({
    isValid: true,
    sessionLoopState: 'MENUS',
    partyOwnerSessionLoopState: 'MENUS',
    customGameName: '',
    customGameTeam: '',
    partyOwnerMatchMap: '',
    partyOwnerMatchCurrentTeam: '',
    partyOwnerMatchScoreAllyTeam: 0,
    partyOwnerMatchScoreEnemyTeam: 0,
    partyOwnerProvisioningFlow: 'Invalid',
    provisioningFlow: 'Invalid',
    matchMap: '',
    // party id is required so that you appear in the online group
    partyId: '00000000-0000-0000-0000-000000000000',
    isPartyOwner: true,
    partyState: 'DEFAULT',
    partyAccessibility: 'CLOSED',
    maxPartySize: 5,
    queueId: 'unrated',
    partyLFM: false,
    partyClientVersion: 'release-10.02-shipping-2-3208409',
    partySize: 1,
    tournamentId: '',
    rosterId: '',
    partyVersion: new Date().getTime(),
    queueEntryTime: '0001.01.01-00.00.00',
    playerCardId: '9fb348bc-41a0-91ad-8a3e-818035c4e561',
    playerTitleId: '',
    preferredLevelBorderId: '',
    accountLevel: 1,
    competitiveTier: ranks_1.Ranks.UNRANKED,
    leaderboardPosition: 0,
    isIdle: false
});
class ValorantPresenceBuilder {
    _presence;
    _config;
    constructor(config) {
        this._config = { ...defaultConfig, ...config };
        return this;
    }
    setPresence = (presence) => {
        this._presence = presence;
        return this;
    };
    _buildDefaultPresence = () => this._config.mergeDefaultPresence
        ? typeof this._config.defaultPresence === 'function'
            ? { ...defaultPresence(), ...this._config.defaultPresence() }
            : { ...defaultPresence(), ...this._config.defaultPresence }
        : typeof this._config.defaultPresence === 'function'
            ? this._config.defaultPresence()
            : this._config.defaultPresence;
    _buildDefaultPresenceObject = () => this._config.mergeDefaultPresenceObject
        ? typeof this._presence === 'function'
            ? { ...defaultPresenceObject(), ...this._presence() }
            : { ...defaultPresenceObject(), ...this._presence }
        : typeof this._presence === 'function'
            ? this._presence()
            : this._presence;
    _toJSON = (replacer, space) => JSON.stringify(this._buildDefaultPresenceObject(), replacer, space);
    _toBase64 = () => Buffer.from(this._toJSON()).toString('base64');
    _toXmlObject = () => new Object({ valorant: { ...this._buildDefaultPresence(), p: this._toBase64() } });
}
exports.ValorantPresenceBuilder = ValorantPresenceBuilder;
