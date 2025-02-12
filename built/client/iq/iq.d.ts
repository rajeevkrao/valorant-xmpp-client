import type { IqObject } from "../../models/iq";
import type { QueryObject, QueryTypes } from "../../models/query";
export declare const formatIq: (iqData: IqObject) => IqOutput;
export interface IqOutput {
    queryType: QueryTypes;
    type: string;
    query?: QueryObject;
}
