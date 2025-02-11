import { JidObject } from "../valorant-xmpp";

export const formatIq = (presence: IqInput): IqOutput => {
  const { from, to, type, id, query, ...other } = presence;
  return {
    type,
  };
};

export interface IqInput {
  from?: string;
  to?: string;
  type?: string;
  query?: any;
  id?: string;
  [propName: string]: any;
}

export interface IqOutput {
  /* sender: JidObject;
  recipient: JidObject; */
  type: string;
  /* id: string | null;
  [propName: string]: any; */
}
