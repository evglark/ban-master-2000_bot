const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const token = '6409534713:AAEnHxLbb7OF_JC0nY5dHTN4Ff4vrkUEQtI';
const webhookUrl = 'https://ban-master-2000-ky93rusgi-evglarks-projects.vercel.app/';
// https://ban-master-2000-bot.vercel.app/

const app = express();
const port = process.env.PORT || 3000;
const bot = new TelegramBot(token);

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.json('🦄🌈✨👋🌎🌍🌏✨🌈🦄');
});

app.post(`/api/webhook/${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

bot.setWebHook(`${webhookUrl}/api/webhook/${token}`);

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  if (msg.text) {
    bot.sendMessage(chatId, `Вы отправили: ${msg.text}`);
  }
});

console.log('Бот запущен!');
module.exports = app;
