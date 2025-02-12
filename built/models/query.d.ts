import { ItemObject } from "./item";
export interface QueryObject {
    item?: ItemObject | ItemObject[];
    xmlns: QueryTypes;
}
export type QueryTypes = "jabber:iq:riotgames:roster";
