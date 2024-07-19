let express = require("express");
const { FindUserByTelegramId } = require("../../sequelize/functoins/functions");
const { BombDefuserGameData, User } = require("../../sequelize/models/models");


let GameRoute = express.Router()

function GetBoostsData(gameData) {
    gameData = gameData.toJSON()
    let resultGameData = {}
    for (const boost in gameData) {
        let boost_data = {
            multiplier: gameData[boost],
            boost_price: Number((10 * gameData[boost] * Math.pow(1.75, gameData[boost])).toFixed(2))
        };
        resultGameData[boost] = boost_data
    }

    return resultGameData
}


GameRoute.post('/getDataBoosts', async (req, res) => {
    let telegramId = req.session.telegramId

    try {
        let user = await FindUserByTelegramId(telegramId)
        if (!user) return res.status(500).end()

        let gameData = await user.getBombDefuserData({
            attributes: [
                'speed_boost',
                'time_boost',
                'money_boost',
                'focus_boost'
            ]
        });


        res.status(200).json({ gameData: GetBoostsData(gameData) })
    } catch (error) {
        console.log('err', error)
        res.status(500)
    }
})



GameRoute.post('/addBoost', async (req, res) => {
    let telegramId = req.session.telegramId
    let { boost_name } = req.body

    try {
        let user = await FindUserByTelegramId(telegramId)
        if (!user) return res.status(500).end()

        const boostModel = await user.getBombDefuserData({
            attributes: [boost_name]
        })
        const UserBoostsModel = await user.getBombDefuserData()
        const boostDataObj = (GetBoostsData(boostModel))[boost_name]

        if (user.money < boostDataObj.boost_price) return res.end()

        await user.increment({ money: -boostDataObj.boost_price })
        await UserBoostsModel.update({ [boost_name]: Number((boostDataObj.multiplier * 1.25).toFixed(2)) })

        res.status(200).end()
    } catch (error) {
        console.log('err', error)
        res.status(500)
    }
})



module.exports = GameRoute

