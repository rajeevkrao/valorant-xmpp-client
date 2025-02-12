export declare class XmppRegions {
    static Asia1: {
        affinity: string;
        domain: string;
        lookupName: string;
    };
    static Asia2: {
        affinity: string;
        domain: string;
        lookupName: string;
    };
    static Brasil: {
        affinity: string;
        domain: string;
        lookupName: string;
    };
    static Europe1: {
        affinity: string;
        domain: string;
        lookupName: string;
    };
    static Europe2: {
        affinity: string;
        domain: string;
        lookupName: string;
    };
    static EuropeNordicAndEast: {
        affinity: string;
        domain: string;
        lookupName: string;
    };
    static EuropeWest: {
        affinity: string;
        domain: string;
        lookupName: string;
    };
    static Japan: {
        affinity: string;
        domain: string;
        lookupName: string;
    };
    static LatinAmericaNorth: {
        affinity: string;
        domain: string;
        lookupName: string;
    };
    static LatinAmericaSouth: {
        affinity: string;
        domain: string;
        lookupName: string;
    };
    static NorthAmerica1: {
        affinity: string;
        domain: string;
        lookupName: string;
    };
    static NorthAmerica2: {
        affinity: string;
        domain: string;
        lookupName: string;
    };
    static NorthAmerica3: {
        affinity: string;
        domain: string;
        lookupName: string;
    };
    static NorthAmerica4: {
        affinity: string;
        domain: string;
        lookupName: string;
    };
    static NorthAmerica5: {
        affinity: string;
        domain: string;
        lookupName: string;
    };
    static Oceania: {
        affinity: string;
        domain: string;
        lookupName: string;
    };
    static PBE: {
        affinity: string;
        domain: string;
        lookupName: string;
    };
    static Russia: {
        affinity: string;
        domain: string;
        lookupName: string;
    };
    static SouthEastAsia1: {
        affinity: string;
        domain: string;
        lookupName: string;
    };
    static SouthEastAsia2: {
        affinity: string;
        domain: string;
        lookupName: string;
    };
    static SouthEastAsia3: {
        affinity: string;
        domain: string;
        lookupName: string;
    };
    static SouthEastAsia4: {
        affinity: string;
        domain: string;
        lookupName: string;
    };
    static SouthKorea: {
        affinity: string;
        domain: string;
        lookupName: string;
    };
    static Turkey: {
        affinity: string;
        domain: string;
        lookupName: string;
    };
}
export type Affinities = ("as2" | "jp1" | "br" | "ru1" | "eu3" | "eun1" | "euw1" | "kr1" | "la1" | "la2" | "na2" | "oc1" | "pbe1" | "sa1" | "sa2" | "sa3" | "sa4" | "tr1" | "us2") | (string & {});
export type Domains = ("as2" | "jp1" | "br1" | "ru1" | "eu3" | "eu2" | "eu1" | "kr1" | "la1" | "la2" | "na1" | "oc1" | "pb1" | "sa1" | "sa2" | "sa3" | "sa4" | "tr1" | "us2") | (string & {});
export type LookupName = ("as2" | "asia" | "br1" | "eu" | "eu3" | "eun1" | "euw1" | "jp1" | "kr1" | "la1" | "la2" | "na1" | "oc1" | "pbe1" | "ru1" | "sea1" | "sea2" | "sea3" | "sea4" | "tr1" | "us" | "us-br1" | "us-la2" | "us2") | (string & {});
export declare class Endpoints {
    static Auth: () => string;
    static Entitlements: () => string;
    static Pas: () => string;
    static ValorantApi: () => string;
}
export interface XmppRegionObject {
    affinity: Affinities;
    domain: Domains;
    lookupName?: LookupName;
}
