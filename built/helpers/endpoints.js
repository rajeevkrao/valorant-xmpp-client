"use strict";
// confident - I'm 100% or almost 100% sure that I named this region correctly
// unsure - I'd need someone with this xmpp region to tell me where exactly the 
//          server resides so that I can give a non-generic name
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoints = exports.XmppRegions = void 0;
class XmppRegions {
    static Asia1 = { affinity: "jp1", domain: "jp1", lookupName: "asia" }; // unsure
    static Asia2 = { affinity: "as2", domain: "as2", lookupName: "as2" }; // unsure
    static Brasil = { affinity: "br", domain: "br1", lookupName: "br1" }; // confident
    static Europe1 = { affinity: "ru1", domain: "ru1", lookupName: "eu" }; // unsure - possibly central eu
    static Europe2 = { affinity: "eu3", domain: "eu3", lookupName: "eu3" }; // unsure
    static EuropeNordicAndEast = { affinity: "eun1", domain: "eu2", lookupName: "eun1" }; // confident
    static EuropeWest = { affinity: "euw1", domain: "eu1", lookupName: "euw1" }; // confident
    static Japan = { affinity: "jp1", domain: "jp1", lookupName: "jp1" }; // confident
    static LatinAmericaNorth = { affinity: "la1", domain: "la1", lookupName: "la1" }; // confident
    static LatinAmericaSouth = { affinity: "la2", domain: "la2", lookupName: "la2" }; // confident
    static NorthAmerica1 = { affinity: "na2", domain: "na1", lookupName: "na1" }; // unsure
    static NorthAmerica2 = { affinity: "la1", domain: "la1", lookupName: "us" }; // unsure
    static NorthAmerica3 = { affinity: "br", domain: "br1", lookupName: "us-br1" }; // unsure
    static NorthAmerica4 = { affinity: "la2", domain: "la2", lookupName: "us-la2" }; // unsure
    static NorthAmerica5 = { affinity: "us2", domain: "us2", lookupName: "us2" }; // unsure
    static Oceania = { affinity: "oc1", domain: "oc1", lookupName: "oc1" }; // confident
    static PBE = { affinity: "pbe1", domain: "pb1", lookupName: "pbe1" }; // confident
    static Russia = { affinity: "ru1", domain: "ru1", lookupName: "ru1" }; // confident
    static SouthEastAsia1 = { affinity: "sa1", domain: "sa1", lookupName: "sea1" }; // unsure
    static SouthEastAsia2 = { affinity: "sa2", domain: "sa2", lookupName: "sea2" }; // unsure
    static SouthEastAsia3 = { affinity: "sa3", domain: "sa3", lookupName: "sea3" }; // unsure
    static SouthEastAsia4 = { affinity: "sa4", domain: "sa4", lookupName: "sea4" }; // unsure
    static SouthKorea = { affinity: "kr1", domain: "kr1", lookupName: "kr1" }; // confident
    static Turkey = { affinity: "tr1", domain: "tr1", lookupName: "tr1" }; // confident
}
exports.XmppRegions = XmppRegions;
class Endpoints {
    static Auth = () => `https://auth.riotgames.com`;
    static Entitlements = () => `https://entitlements.auth.riotgames.com/api/token/v1`;
    static Pas = () => `https://riot-geo.pas.si.riotgames.com`;
    static ValorantApi = () => `https://valorant-api.com`;
}
exports.Endpoints = Endpoints;
