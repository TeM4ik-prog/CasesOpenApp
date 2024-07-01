const TelegramBot = require('node-telegram-bot-api');
const { User } = require('./sequelize/models/models');
const { axios } = require('axios');

const token = '6950639322:AAHRjkcQ-v4ToGmXCNy14T5HsHIRPskOtD0';

//https://09ce2372-faa8-4aca-b312-a6a424b1f8da-00-2g957sgnhu01l.kirk.replit.dev
const WebAppUrl = 'https://tgwebappbytem4ik.netlify.app'

const bot = new TelegramBot(token, { polling: true });


bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const username = msg.chat.username;

    // Поиск пользователя в базе данных по Telegram ID
    let user = await User.findOne({ where: { telegramId: chatId.toString() } });
    console.log(user)



    if (!user) {
        user = await User.create({ telegramId: chatId.toString(), username: username });
        // bot.sendMessage(chatId, 'Добро пожаловать! Вы были добавлены в базу данных.');
    }
    // else {
    //     // bot.sendMessage(chatId, 'Вы уже зарегистрированы в базе данных.');
    // }

    // {
    //     // axios.post(
    //     //     'http://localhost:5000/login',

    //     //     {
    //     //         telegramId: chatId.toString(),
    //     //         username: username
    //     //     },

    //     //     {
    //     //         headers: {
    //     //             "Content-Type": "application/json",

    //     //             withCredentials: true
    //     //         },
    //     //     })
    //     //     .then((response) => {
    //     //         console.log("Resp data", response.data)

    //     //     })
    //     //     .catch((error) => {
    //     //         console.log(error)
    //     //     });
    //     }

    console.log(`${WebAppUrl}?token=${chatId.toString()}`)

    await bot.sendMessage(chatId, 'зайти в игру', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Играть', web_app: { url: `${WebAppUrl}?token=${chatId.toString()}` } }]
            ]
        }

    });



});

