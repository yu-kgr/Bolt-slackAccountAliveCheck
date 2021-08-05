const usersIdListMock = ['W012A3CDE', 'W07QCRPA4'];
const { openConversations, getUserChannelId, postMessage } = require('../conversationsOpen');

// TODO: openConversations(userIdList)のテストかく
// @see: https://api.slack.com/methods/conversations.open
test('存在するUserIDを渡すと、ChannelIdが返却されること', async() => {
    // ASK: openConversations内のawait client.conversations.openをどうモック関数化できるのかわからん
});

test('存在しないUserIDを渡すと、errorが返却されること', async() => {
    // ASK: openConversations内のawait client.conversations.openをどうモック関数化できるのかわからん
});


// TODO: getUserChannelId(responseList)のテストかく

// TODO: postMessage(channelIdList)のテストかく