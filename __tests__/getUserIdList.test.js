const fs = require('fs');
const usersListMock = JSON.parse(fs.readFileSync('./__mocks__/clientUsersList.json', 'utf8'));
const { saveUserId } = require('../getUserIdList');

test('"削除済User","botUser","slackbot" 以外のユーザーIDを取得できる', async () => {
    const userIds = await saveUserId(usersListMock.members);
    expect(userIds).toStrictEqual(['W012A3CDE', 'W07QCRPA4']);
});