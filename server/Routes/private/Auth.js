let express = require("express");
const { User } = require("../../sequelize/models/models");


let AuthRoute = express.Router()


AuthRoute.post('/login', async (req, res) => {
    const { telegramId } = req.body;
    console.log(telegramId)
    try {
        req.session.telegramId = telegramId
        res.status(200).end()
    } catch (error) {
        res.status(500).end()
    }

});






AuthRoute.post('/logout', (req, res) => {
    req.session.destroy();
});



module.exports = AuthRoute