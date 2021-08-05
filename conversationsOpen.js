require('dotenv').config();

const { WebClient, LogLevel } = require("@slack/web-api");
const client = new WebClient(process.env.SLACK_BOT_TOKEN, {
    logLevel: LogLevel.DEBUG
});

async function sendDirectMessage(userIdList){
    try {
        const openConversationsResponse = await openConversations(userIdList);
        const userChannelId = await getUserChannelId(openConversationsResponse);
        await postMessage(userChannelId);
    } catch (error) {
        console.error(error);
    }
}

async function openConversations(userIdList) {
    let result = [];
    for (const user of userIdList) {
        result.push(await client.conversations.open({
            users: user
        }));
        console.log(`NOTE: Opened Conversations to ${user} !`);
    }
    console.log(result);
    return result;
}

async function getUserChannelId (responseList) {
    let result = [];
    for (const res of responseList) {
        result.push(res['channel']['id']);
        console.log(`NOTE: Sort Channel id list ${res['channel']['id']} !`);
    }
    console.log(result);
    return result;
}

async function postMessage(channelIdList) {
    for (const id of channelIdList) {
        await client.chat.postMessage({
            channel: id,
            blocks: [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "どうも、はじめまして✋\n *alcohol-heaven* のなんでも屋、 *Alco* です👩‍💻 \n 長い間接続されてないアカウント有無調査のためDMさせて頂きました🙏\n\nコチラの内容を確認できた方は下記のボタンを押して頂けると助かります😭"
                    }
                },
                {
                    "type": "actions",
                    "elements": [
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "emoji": true,
                                "text": "生きてるよ！"
                            },
                            "style": "primary",
                            "value": "click_me_123"
                        }
                    ]
                }
            ]
        });
    }
}

module.exports = {
    sendDirectMessage,
    openConversations,
    getUserChannelId,
    postMessage
};