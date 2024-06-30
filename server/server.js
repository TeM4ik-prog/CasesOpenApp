const TelegramBot = require('node-telegram-bot-api');

const token = '6950639322:AAHRjkcQ-v4ToGmXCNy14T5HsHIRPskOtD0';

//https://09ce2372-faa8-4aca-b312-a6a424b1f8da-00-2g957sgnhu01l.kirk.replit.dev/
const WebAppUrl = 'https://tgwebappbytem4ik.netlify.app/'

const bot = new TelegramBot(token, { polling: true });


bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text


    if (text === '/start') {
        await bot.sendMessage(chatId, 'зайти в игру', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Играть', web_app: { url: WebAppUrl } }]
                ]
            }

        });
    }

});