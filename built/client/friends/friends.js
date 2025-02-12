"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatRoster = void 0;
const parsers_1 = require("../../helpers/parsers");
const formatRosterInfo = ({ id, lol, jid, name, subscription, puuid }) => new Object({
    jid: { jid, ...(0, parsers_1.parseJid)(jid) },
    puuid: puuid,
    name: typeof id === 'undefined' ? null : id.name || null,
    tagline: typeof id === 'undefined' ? null : id.tagline || null,
    lolName: typeof lol === 'undefined' ? null : lol.name || null,
    preferredName: typeof name === 'undefined' ? null : name,
    isFriend: subscription === 'both',
    isIncoming: subscription === 'pending_in',
    isOutgoing: subscription === 'pending_out'
});
const parseRosterInfo = (friends) => Array.isArray(friends)
    ? friends.map(friend => formatRosterInfo(friend))
    : formatRosterInfo(friends);
const formatRoster = (presence) => {
    const { from, to, type, id, query, ...other } = presence;
    const rosterObj = {
        // sender jid
        sender: typeof from === 'undefined' ? null : { jid: from, ...(0, parsers_1.parseJid)(from) },
        // recipient jid 
        recipient: typeof to === 'undefined' ? null : { jid: to, ...(0, parsers_1.parseJid)(to) },
        // 
        roster: typeof query.item === 'undefined' ? null : parseRosterInfo(query.item),
        // result - when fetching friends list
        // set - when changing it (e.g. sending friend request) 
        type: type || null,
        // event id
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
        rosterObj.other = uncapturedData;
    return rosterObj;
};
exports.formatRoster = formatRoster;
