require('dotenv').config({ path: '../.env' });

const fs = require('fs')
const path = require('path')

const TelegramBot = require('node-telegram-bot-api');
const { User } = require('./sequelize/models/models');
const axios = require('axios');


const token = process.env.TELEGRAM_TOKEN;
const WebAppUrl = 'http://localhost:5000'
// https://af733b5f-edd6-4d66-8db1-0f3f007a2a41-00-1pqn1ekfc2xsb.spock.replit.dev
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

    // console.log(user)


    // axios.post(
    //     `${WebAppUrl}/auth/login`,
    //     { telegramId },
    //     {
    //         withCredentials: true // Включаем передачу куки
    //     })
    //     .then((response) => {
    //         console.log("User data", response.data)

    //         // navigate('/');
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     });




    // console.log(`${WebAppUrl}/login?token=${telegramId}`)

    const photoPath = path.join(__dirname, 'public/images/startAppImg.jpg');

    bot.sendPhoto(chatId, './public/images/startAppImg.jpg', {
        caption: `Готовы испытать удачу?\nОткрывайте кейсы, собирайте редкие предметы и соревнуйтесь с другими игроками! 🎁🏆`,
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Let's go", web_app: { url: 'https://af733b5f-edd6-4d66-8db1-0f3f007a2a41-00-1pqn1ekfc2xsb.spock.replit.dev' } },
                    { text: 'Join community', url: 'https://t.me/caserush' },
                ],
            ]
        }
    });



});

