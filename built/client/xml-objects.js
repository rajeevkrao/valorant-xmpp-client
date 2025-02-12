"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOutgoingFriendRequest = exports.sendFriendRequest = exports.fetchFriends = exports.sendMessage = exports.setupSession = exports.rxep = exports.setEntitlements = exports.clientName = exports.mechanism = exports.xmlDeclaration = void 0;
// does not work due to the way parser currently handles non empty unpaired nodes
// export const xmlDeclaration = (region: XmppRegionObject) => new Object({
//     '?xml': {
//         '@_version': "1.0",
//     },
//     'stream:stream': {
//         '@_to': `${region.domain}.pvp.net`,
//         '@_xmlns:stream': "http://etherx.jabber.org/streams"
//     },
// });
const xmlDeclaration = (region) => `
    <?xml version="1.0"?>
    <stream:stream to="${region.domain}.pvp.net" version="1.0" xmlns:stream="http://etherx.jabber.org/streams">
`;
exports.xmlDeclaration = xmlDeclaration;
const mechanism = (authToken, pasToken) => new Object({
    'auth': {
        '@_mechanism': "X-Riot-RSO-PAS",
        '@_xmlns': "urn:ietf:params:xml:ns:xmpp-sasl",
        'rso_token': authToken,
        'pas_token': pasToken
    }
});
exports.mechanism = mechanism;
const clientName = () => new Object({
    'iq': {
        '@_id': "_xmpp_bind1",
        '@_type': "set",
        'bind': {
            '@_xmlns': "urn:ietf:params:xml:ns:xmpp-bind",
            'puuid-mode': {
                '@_enabled': "true"
            },
            'resource': "RC-VALORANT-NODE"
        }
    }
});
exports.clientName = clientName;
const setEntitlements = (entitlementsToken) => new Object({
    'iq': {
        '@_id': "xmpp_entitlements_0",
        '@_type': "set",
        'entitlements': {
            '@_xmlns': "urn:riotgames:entitlements",
            'token': entitlementsToken
        }
    }
});
exports.setEntitlements = setEntitlements;
const rxep = () => new Object({
    'iq': {
        '@_id': "set_rxep_1",
        '@_type': "set",
        'rxcep': {
            '@_xmlns': "urn:riotgames:rxep",
            'last-online-state': {
                '@_enabled': "true"
            }
        }
    }
});
exports.rxep = rxep;
const setupSession = () => new Object({
    'iq': {
        '@_id': "_xmpp_session1",
        '@_type': "set",
        'session': {
            '@_xmlns': "urn:ietf:params:xml:ns:xmpp-session"
        }
    }
});
exports.setupSession = setupSession;
const sendMessage = (jid, message) => new Object({
    'message': {
        '@_to': jid,
        '@_type': "chat",
        'body': message
    }
});
exports.sendMessage = sendMessage;
const fetchFriends = () => new Object({
    'iq': {
        '@_type': "get",
        'query': {
            '@_xmlns': "jabber:iq:riotgames:roster"
        }
    }
});
exports.fetchFriends = fetchFriends;
const sendFriendRequest = (username, tagline) => new Object({
    'iq': {
        '@_type': "set",
        '@_id': "roster_add_10",
        'query': {
            '@_xmlns': "jabber:iq:riotgames:roster",
            'item': {
                '@_subscription': "pending_out",
                'id': {
                    '@_name': username,
                    '@_tagline': tagline
                }
            }
        }
    }
});
exports.sendFriendRequest = sendFriendRequest;
const removeOutgoingFriendRequest = (jid) => new Object({
    'iq': {
        '@_type': "set",
        '@_id': "roster_remove_1",
        'query': {
            '@_xmlns': "jabber:iq:riotgames:roster",
            'item': {
                '@_subscription': "remove",
                '@_jid': jid
            }
        }
    }
});
exports.removeOutgoingFriendRequest = removeOutgoingFriendRequest;
