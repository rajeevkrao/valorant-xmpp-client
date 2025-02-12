import { QueryObject } from "./query";

export interface IqObject {
  query?: QueryObject;
  from: string;
  to: string;
  id: string;
  type: string;
}
