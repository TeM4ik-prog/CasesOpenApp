let express = require("express");
const { User } = require("../../sequelize/models/models");


let AuthRoute = express.Router()


AuthRoute.post('/login', async (req, res) => {
    const { telegramId } = req.body;

    console.log(telegramId)

    req.session.test = 'artem'

    console.log(req.session.test)


    res.end()
});





// AuthRoute.post('/logout', (req, res) => {
//     req.session.destroy();
// });



module.exports = AuthRoute