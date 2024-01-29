const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const token = '6409534713:AAEnHxLbb7OF_JC0nY5dHTN4Ff4vrkUEQtI';
const bot = new TelegramBot(token);

const webhookUrl = 'https://project-w-alpha.vercel.app/';
const port = 3002;

const app = express();

app.post(`/webhook/${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Webhook server is listening on port ${port}`);
});

bot.setWebHook(`${webhookUrl}/webhook/${token}`);

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log(msg, chatId);

  if (msg.text) {
    bot.sendMessage(chatId, `Вы отправили: ${msg.text}`);
  }
});

console.log('Бот запущен!');
