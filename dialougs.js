const { BotkitConversation } = require('botkit');
let DIALOG_ID = 'my_dialog_1';
let myDialog = new BotkitConversation(DIALOG_ID, controller);
myDialog.say('Hello!');
myDialog.say('Welcome to the world of bots!');

controller.addDialog(myDialog);

controller.on('channel_join', async (bot, message) => {
  await bot.beginDialog(DIALOG_ID);
});
