import * as fs from "fs";

import { Builders, ValorantXmppClient } from "../src/index";

import { getTokenFromUrl } from "./utils";

const { PresenceBuilder, KeystonePresenceBuilder, ValorantPresenceBuilder } =
  Builders;

const xmppClient = new ValorantXmppClient({ verbose: true });

xmppClient.presence = new PresenceBuilder()
  .addKeystonePresence(new KeystonePresenceBuilder())
  .addValorantPresence(new ValorantPresenceBuilder());

xmppClient.once("ready", () => {
  console.log("ready");
});

/* xmppClient.on("presence", (data) => {
  console.log(data);
}); */

/* const getUnixTimestamp = () => {
  return Math.floor(new Date().getTime() / 1000);
}; */

xmppClient.on("roster", async (data) => {
  /* const friendRequests = data.filter((entity) => entity.isIncoming);
  const unAcceptedFriendRequests = data.filter((entity) => entity.isOutgoing);
  console.log({ friendRequests, unAcceptedFriendRequests }); */

  await xmppClient.acceptAllFriendRequests();

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
