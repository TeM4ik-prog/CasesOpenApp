let express = require("express");
const { User, Loot } = require("../../sequelize/models/models");
const { FindUserByTelegramId, GetArLootByCategories } = require("../../sequelize/functoins/functions");
const { RandInt, RandElemFromAr } = require("../../utils/functions");


let PrivateRoute = express.Router()


PrivateRoute.post('/open', async (req, res) => {
    let telegramId = req.session.telegramId
    const { moneyToOpen } = req.body;

    console.log(moneyToOpen)


    let user = await FindUserByTelegramId(telegramId)

    if (!user) return
    if (user.money < moneyToOpen) return

    let { commonAr, uncommonAr, epicAr, legendaryAr } = await GetArLootByCategories()

    // console.log(commonAr, uncommonAr, epicAr, legendaryAr)


    console.log(RandElemFromAr(epicAr))

    // for (let i = 0; i < 1; i++) {
    //     let chance = RandInt(0, 100)
    //     let loot

    //     if (chance < 3) {//legendary
    //         loot = RandElemFromAr(legendaryAr)
    //     }
    //     else if (chance < 15) {//epic
    //         loot = RandElemFromAr(epicAr)

    //     }
    //     else if (chance < 40) {//uncommom
    //         loot = RandElemFromAr(uncommonAr)
    //     }
    //     else {//commom
    //         loot = RandElemFromAr(commonAr)
    //     }

    //     console.log(loot)
    // }

    res.end()
});



PrivateRoute.post('/getUser', async (req, res) => {
    let telegramId = req.session.telegramId

    // console.log(telegramId)

    try {
        let user = await User.findOne({ where: { telegramId: telegramId } });
        res.json({ user })
    } catch (error) {
        console.log('err')
    }
})





module.exports = PrivateRoute


