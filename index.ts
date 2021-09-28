import {App, LogLevel} from "@slack/bolt";
import dotenv from "dotenv";

const config = dotenv.config().parsed!;

if (config) {
  Object.keys(config).forEach((key) => {
    process.env[key] = config[key];
  });
}

const app = new App({
  // logLevel: LogLevel.DEBUG,
  socketMode: true,
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN
});

app.view("modal-id", async ({ ack, view, logger }) => {
  logger.info(`Submitted data: ${view.state.values}`);
  await ack();
});

app.event('member_joined_channel', async ({ event, client }) => {
  console.log('YOSOKO!!')

  const text =  `YOSOKO!! <@${event.user}>`
  try {
    await client.chat.postMessage({
      channel: 'C02FG2RV4GP',
      text
    })
  } catch(e) {
    console.dir({e}, {depth: null});
    if (e instanceof Error) throw e;
  }
  console.log({text})
});

(async () => {
  await app.start();
  console.log('⚡️ Bolt app started');
})();
