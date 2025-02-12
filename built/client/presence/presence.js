"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPresence = void 0;
const parsers_1 = require("../../helpers/parsers");
const valorant_1 = require("./valorant");
const formatGamePresence = (type, presence) => {
    switch (type) {
        case 'keystone':
            return { type, presence };
        case 'league_of_legends':
            return { type, presence };
        case 'valorant':
            return { type, ...(0, valorant_1.formatValorantPresence)(presence) };
        default:
            return new Object()[type] = presence;
    }
};
const parseGamePresence = (games) => Object.entries(games).map(([type, presence]) => formatGamePresence(type, presence));
const formatPresence = (presence) => {
    const { from, to, show, type, games, status, last_online, id, ...other } = presence;
    const presenceObj = {
        // sender jid
        sender: typeof from === 'undefined' ? null : { jid: from, ...(0, parsers_1.parseJid)(from) },
        // recipient jid 
        recipient: typeof to === 'undefined' ? null : { jid: to, ...(0, parsers_1.parseJid)(to) },
        // online status
        status: show || null,
        // status message
        statusMessage: status || null,
        // various game presences
        gamePresence: typeof games === 'undefined' ? null : parseGamePresence(games),
        // when user was last online - or null if they are online
        last_online: typeof last_online === 'undefined' ? null : (0, parsers_1.parseLastOnline)(last_online),
        // available, unavailable or null - once the user goes offline presence
        // with type unavailable is sent 
        type: type || null,
        // schema: presence_count -> count is in ascending order but
        // some numbers may get skipped
        id: id || null
    };
    // data I didn't come across while making this, please report
    // it to me (ev3nvy#9996) so that I can properly format it 
    const uncapturedData = Object.entries(other).length === 0 ? null
        : new Object({
            info: 'Data inside of this object is not formatted as I have never encountered'
                + ' it during development. Please open an issue or DM me on discord at ev3nvy#9996.',
            data: other
        });
    if (uncapturedData !== null)
        presenceObj.other = uncapturedData;
    return presenceObj;
};
exports.formatPresence = formatPresence;
