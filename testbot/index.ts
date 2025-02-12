import * as fs from "fs";

import { Builders, ValorantXmppClient } from "../src/index";

import { getTokenFromUrl } from "./utils";
import { PresenceOutput } from "../src/client/presence/presence";

let mainJid: string = "";
const mainIdName = "baa guru OM kudi";
const mainIdTagline = "720ml";

const { PresenceBuilder, KeystonePresenceBuilder, ValorantPresenceBuilder } =
  Builders;

const xmppClient = new ValorantXmppClient({
  /* verbose: true,
  autoAcceptIncomingRequests: true, */
});

xmppClient.presence = new PresenceBuilder()
  .addKeystonePresence(new KeystonePresenceBuilder())
  .addValorantPresence(new ValorantPresenceBuilder());

xmppClient.once("ready", () => {
  console.log("ready");
});

xmppClient.on("presence", (data: PresenceOutput) => {
  const jid = `${data.sender.local}@${data.sender.domain}`;
  if (mainJid && jid === mainJid) {
		console.log({ tset2: data })
		console.log({ tset1: data.gamePresence?.[0] })
		console.log({ tset1: data.gamePresence?.[1] })
    console.log({ test: data.gamePresence?.[1]?.presence?.partyState });
  }
});

/* const getUnixTimestamp = () => {
  return Math.floor(new Date().getTime() / 1000);
}; */

xmppClient.on("incomingRequest", async (data) => {
  console.log("incomingRequest", data.query.item.id);
  /* xmppClient.sendFriendRequest(data.query.item.id.name, data.query.item.id.tagline); */
});

xmppClient.on("roster", async (data) => {
  /* const friendRequests = data.filter((entity) => entity.isIncoming);
  const unAcceptedFriendRequests = data.filter((entity) => entity.isOutgoing);
  console.log({ friendRequests }); */
  /* console.log({ data }); */
  const mainId = data.find(
    (entity) => entity.name === mainIdName && entity.tagline === mainIdTagline
  );
  mainJid = mainId.jid.jid;

  /* const inst = await xmppClient.getXmppInstance();
  inst.send(`<message to="${friendRequests[0].jid.jid}" type="chat">
    <body>Hey there, wanna play?</body>
  </message>`); */
});

xmppClient.on("message", async (data) => {
  console.log(data);
  const inst = await xmppClient.getXmppInstance();
  inst.send(`<message to="${data.from}" type="chat">
    <body>Hey there, wanna play?</body>
  </message>`);
});

xmppClient.on("error", (error) => {
  console.log(error);
});

const url = fs.readFileSync("./url.txt", "utf8");
const token = getTokenFromUrl(url);

/* xmppClient.login({ username: 'adnan_momin', password: 'adnan@618' }); */
xmppClient.login({
  accessToken: token,
});
/* xmppClient.login({ ssidCookie: '' }); */
