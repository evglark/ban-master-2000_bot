require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('Привет! Я чат-бот на Node.js!');
});

bot.command('ban', async (ctx) => {
  try {
    const chatId = ctx.message.chat.id;
    const administrators = await ctx.telegram.getChatAdministrators(chatId);
    const adminCanManageChat = administrators.find((el) => el.user.id === ctx.message.from.id);

    if (adminCanManageChat?.can_manage_chat || adminCanManageChat.status === 'creator') {
      const { id, is_bot, first_name } = ctx.message.reply_to_message.from;

      if (!is_bot) {
        const isSenderAdmin = administrators.some((el) => el.user.id === ctx.message.from.id);
        if (isSenderAdmin) {
          const keyboard = Markup.inlineKeyboard([
            Markup.button.callback('⏱️ Время', 'time'),
            Markup.button.callback('🪙 Монетка', 'coin'),
          ]);

          // await ctx.telegram.banChatMember(ctx.message.chat.id, id);
          await ctx.reply(`Выберите вариант для пользователя ${first_name}:`, keyboard);
          // ctx.reply(`Пользователь ${first_name} забанен.`);
        }
      } else {
        ctx.reply(`Отставить огонь по своим!`);
      }
    } else {
      ctx.reply('Вы не являетесь администратором группы. Эта команда доступна только администраторам.');
      return void 0;
    }
  } catch (error) {
    console.error('Ошибка при бане пользователя:', error);
    ctx.reply('Произошла ошибка при бане пользователя. Пожалуйста, попробуйте ещё раз.');
  }
});

bot.launch();
