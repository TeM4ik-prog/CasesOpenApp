const { User } = require("../../sequelize/models/models");

let express = require("express");



let StatisticRoute = express.Router()




StatisticRoute.post('/getUserStat', async (req, res) => {
    let telegramId = req.session.telegramId

    try {
        let user = await FindUserByTelegramId(telegramId)
        if (!user) return



        res.json({ user })
    } catch (error) {
        console.log('err', error)
    }
})

StatisticRoute.post('/getGlobalStat', async (req, res) => {
    try {

        const SortedGlobalUsers = await User.findAll({

            order: [['money', 'DESC']]
        })

        console.log(SortedGlobalUsers)

        res.json({ SortedGlobalUsers })
    } catch (error) {
        console.log('err', error)
    }
})






module.exports = StatisticRoute