require('dotenv').config({ path: '../.env' });

const TelegramBot = require('node-telegram-bot-api');
const { User } = require('./sequelize/models/models');
const { axios } = require('axios');
const { localSitePath } = require('../LocalSitePath');


const token = process.env.TELEGRAM_TOKEN;
const WebAppUrl = localSitePath

const bot = new TelegramBot(token, { polling: true });


bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const username = msg.chat.username;

    let telegramId = chatId.toString()

    // Поиск пользователя в базе данных по Telegram ID
    let user = await User.findOne({ where: { telegramId: telegramId } });
    console.log(user)



    if (!user) {
        user = await User.create({ telegramId: telegramId, username: username });
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

    console.log(`${WebAppUrl}/loginUser?token=${telegramId}`)

    await bot.sendMessage(chatId, 'зайти в игру', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Играть', web_app: { url: `${WebAppUrl}/login?token=${telegramId}` } }]
            ]
        }

    });



});

