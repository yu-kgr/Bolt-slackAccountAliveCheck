require('dotenv').config();

const { WebClient, LogLevel } = require("@slack/web-api");
const client = new WebClient(process.env.SLACK_BOT_TOKEN, {
    logLevel: LogLevel.DEBUG
});

const getUserIdList = (async() => {
    try {
        const result = await client.users.list();
        const userIds = await saveUserId(result.members);
        return userIds;
    } catch (error) {
        console.error(error);
    }
})();

function saveUserId(usersArray) {
    let result = [];
    usersArray.forEach(function(user){
        // NOTE: 削除済みのUser以外 & bot以外 & slackbot 以外のユーザーIDを取得する
        if(!user['deleted'] && !user['is_bot'] && (user['name'] !== 'slackbot')) {
            result.push(user["id"]);
        }
    });
    return result;
}

module.exports = {
    getUserIdList,
    saveUserId
};