let express = require("express");
const { User } = require("../../sequelize/models/models");
const { FindUserByTelegramId } = require("../../sequelize/functoins/functions");


let AuthRoute = express.Router()


AuthRoute.post('/login', async (req, res) => {
    const { telegramId } = req.body;
    console.log(telegramId);
    try {
        req.session.telegramId = telegramId;

        await new Promise((resolve, reject) => {
            req.session.save(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });

        // Выполняем поиск пользователя только после успешного сохранения сессии
        let user = await FindUserByTelegramId(telegramId);

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).end()
    }
});






AuthRoute.get('/logout', (req, res) => {
    req.session.destroy();
});



module.exports = AuthRoute