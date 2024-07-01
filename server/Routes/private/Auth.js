let express = require("express");
const { User } = require("../../sequelize/models/models");


let AuthRoute = express.Router()


AuthRoute.post('/login', async (req, res) => {
    const { telegramId, username } = req.body;

    req.session.telegramId = telegramId

    // console.log(req.session.telegramId)

    res.status(200).end()
});






AuthRoute.post('/logout', (req, res) => {
    req.session.destroy();
});



module.exports = AuthRoute