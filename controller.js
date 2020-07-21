const { Botkit } = require('botkit');

const controller = new Botkit({
  webhook_uri: '/api/messages',
});

controller.hears(
  ['hi', 'hello', 'howdy', 'hey', 'aloha', 'hola', 'bonjour', 'oi', 'مرحبا'],
  ['message'],
  async (bot, message) => {
    // do something to respond to message
    await bot.reply(message, 'Oh hai!');
  }
);
controller.on('message', async (bot, message) => {
  await bot.reply(message, 'I heard you Plz say something!');
});
controller.interrupts('help', 'message', async (bot, message) => {
  // start a help dialog, then eventually resume any ongoing dialog
  await bot.beginDialog(HELP_DIALOG);
});
controller.interrupts('Exit', 'message', async (bot, message) => {
  // cancel any active dialogs
  await bot.reply(message, 'Exiting!');
});
let DIALOG_ID = 'my_dialog_1';
let myDialog = new BotkitConversation(DIALOG_ID, controller);
myDialog.say('Hello!');
myDialog.say('Welcome to the world of bots!');

// Add the dialog to the bot
controller.addDialog(myDialog);

// Later, trigger the dialog
controller.on('channel_join', async (bot, message) => {
  await bot.beginDialog(DIALOG_ID);
});
