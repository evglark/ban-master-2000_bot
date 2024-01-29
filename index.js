const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('Привет! Я чат-бот на Node.js.');
});

bot.on('text', (ctx) => {
  ctx.reply(`Вы написали: ${ctx.message.text}`);
});

bot.help((ctx) => {
  ctx.reply('Это простой чат-бот. Отправьте текстовое сообщение, и я отвечу на него.');
});

bot.launch();
