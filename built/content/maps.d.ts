export declare class Maps {
    static Ascent: MapObject;
    static Bind: MapObject;
    static Breeze: MapObject;
    static Fracture: MapObject;
    static Haven: MapObject;
    static Icebox: MapObject;
    static Split: MapObject;
    static TheRange: MapObject;
}
export type MapUrls = ('/Game/Maps/Ascent/Ascent' | '/Game/Maps/Duality/Duality' | '/Game/Maps/Foxtrot/Foxtrot' | '/Game/Maps/Canyon/Canyon' | '/Game/Maps/Triad/Triad' | '/Game/Maps/Port/Port' | '/Game/Maps/Bonsai/Bonsai' | '/Game/Maps/Poveglia/Range') | (string & {});
export interface MapObject {
    name: string;
    uuid: string;
    url: MapUrls;
}
