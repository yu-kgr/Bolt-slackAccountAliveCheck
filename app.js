require('dotenv').config();
const { App } = require('@slack/bolt');
const { getUserIdList } = require('./getUserIdList');
const { sendDirectMessage } = require('./conversationsOpen');
let allUserIdList = [];

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.message('hello', async ({ message, say }) => {
    await say({
        blocks: [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `Hey there <@${message.user}>!`
                },
                "accessory": {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Click Me"
                    },
                    "action_id": "button_click"
                }
            }
        ],
        text: `Hey there <@${message.user}>!`
    });
    console.log('say(); action.');
});

app.message('__openConversations', async() => {
    // NOTE: 全UserとのDM枠を作成、送信する
    await sendDirectMessage(allUserIdList);
})

app.action('button_click', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    await say(`<@${body.user.id}> clicked the button`);
});

(async () => {
    await app.start(process.env.PORT || 3001);

    // NOTE: SlackWorkSpace 参加UserIDの一覧取得
    allUserIdList = await getUserIdList;

    console.log('⚡️ Bolt app is running!');

})();

