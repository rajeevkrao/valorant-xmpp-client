import type { IqObject } from "../../models/iq";
import type { QueryObject, QueryTypes } from "../../models/query";
import { JidObject } from "../valorant-xmpp";

export const formatIq = (iqData: IqObject): IqOutput => {
  const { from, to, type, id, query, ...other } = iqData;
  return {
    type,
    queryType: query?.xmlns,
    query,
  };
};

export interface IqOutput {
  /* sender: JidObject;
  recipient: JidObject; */
  queryType: QueryTypes;
  type: string;
  query?: QueryObject;
  /* id: string | null;
  [propName: string]: any; */
}
