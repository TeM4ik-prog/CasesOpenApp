require('dotenv').config({ path: '../.env' });

const TelegramBot = require('node-telegram-bot-api');
const { User } = require('./sequelize/models/models');
const { axios } = require('axios');


const token = process.env.TELEGRAM_TOKEN;
const WebAppUrl = 'https://af733b5f-edd6-4d66-8db1-0f3f007a2a41-00-1pqn1ekfc2xsb.spock.replit.dev'

const bot = new TelegramBot(token, { polling: true });


bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const username = msg.chat.username;
    let telegramId = chatId.toString()

    let photosObjData = await bot.getUserProfilePhotos(userId)
    let fileId = photosObjData.photos[0][photosObjData.photos[0].length - 1].file_id;

    const file = await bot.getFile(fileId);
    const fileAvatarUrl = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
    console.log(fileAvatarUrl);

    let user = await User.findOne({ where: { telegramId: telegramId } });

    if (!user) {
        user = await User.create({ telegramId: telegramId, username: username, avatar: fileAvatarUrl });
    }

    console.log(user)

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

    console.log(`${WebAppUrl}/login?token=${telegramId}`)

    await bot.sendMessage(chatId, 'зайти в игру', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Играть', web_app: { url: `${WebAppUrl}/login?token=${telegramId}` } }]
            ]
        }

    });



});

