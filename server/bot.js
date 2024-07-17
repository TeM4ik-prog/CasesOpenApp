require('dotenv').config({ path: '../.env' });

const fs = require('fs')
const path = require('path')

const TelegramBot = require('node-telegram-bot-api');
const { User } = require('./sequelize/models/models');
const axios = require('axios');
const { sequelize } = require('./sequelize/config/SequelizeConfig');

const CHANNEL_ID = '@caserush';
const token = process.env.TELEGRAM_TOKEN;
const WebAppUrl = 'https://af733b5f-edd6-4d66-8db1-0f3f007a2a41-00-1pqn1ekfc2xsb.spock.replit.dev'
const bot = new TelegramBot(token, { polling: true });



bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const username = msg.chat.username;
    let telegramId = chatId.toString()


    let photosObjData = await bot.getUserProfilePhotos(userId)

    let fileAvatarUrl = null
    if (photosObjData.photos[0]) {
        let fileId = photosObjData.photos[0][photosObjData.photos[0].length - 1].file_id;

        const file = await bot.getFile(fileId);
        fileAvatarUrl = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
        console.log(fileAvatarUrl);
    }


    let user = await User.findOrCreate({ where: { telegramId: telegramId, username: username, avatar: fileAvatarUrl } });
    console.log(user)

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


    const chatMember = await bot.getChatMember(CHANNEL_ID, userId);
    console.log(`User status: ${chatMember.status}`);

    if (chatMember.status === 'member' || chatMember.status === 'administrator' || chatMember.status === 'creator') {
        SendUserExit()
    }
    else {
        bot.sendMessage(chatId, 'Вы не подписаны на канал!\n\nОтправтье повторно /start для проверки подписки', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Join community', url: 'https://t.me/caserush' }]
                ]
            }
        });
    }


    function SendUserExit() {
        bot.sendPhoto(chatId, photoPath, {
            caption: `Готовы испытать удачу?\nОткрывайте кейсы, собирайте редкие предметы и соревнуйтесь с другими игроками! 🎁🏆`,
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Let's go",
                        web_app: { url: `${WebAppUrl}/login?token=${telegramId}` }
                    }],
                ]
            }
        });
    }


});

