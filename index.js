const { Bot, Telegram, Commands, Message } = require("@telegraf/telegraf");

const bot = new Bot({
  token: process.env.BOT_TOKEN,
  group: process.env.GROUP_ID,
});

bot.on("message", (message) => {
  if (message.text === "/start") {
    message.reply("Привет! Я твой Telegram-бот.");
  }
});

bot.start();
