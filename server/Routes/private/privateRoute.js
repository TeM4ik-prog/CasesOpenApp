let express = require("express");
const { User, Loot, UserLootInInventory, CategoryRare } = require("../../sequelize/models/models");
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

    let Result_Loot_box = []

    let { commonAr, uncommonAr, epicAr, legendaryAr } = await GetArLootByCategories()

    for (let i = 0; i < 30; i++) {
        let chance = RandInt(0, 100)
        let loot

        if (chance < 3) {//legendary
            loot = RandElemFromAr(legendaryAr)
        }
        else if (chance < 15) {//epic
            loot = RandElemFromAr(epicAr)

        }
        else if (chance < 40) {//uncommom
            loot = RandElemFromAr(uncommonAr)
        }
        else {//commom
            loot = RandElemFromAr(commonAr)
        }

        Result_Loot_box.push(loot);





    }

    let winnerLootModelObj = Result_Loot_box[19]

    await user.increment({ money: -moneyToOpen })
    // await user.reload();



    async function addOrUpdateLoot(user, loot) {
        const [userLoot, created] = await UserLootInInventory.findOrCreate({
            where: {
                UserId: user.id,
                LootId: loot.id
            },
            defaults: {
                quantity: 1
            }
        });

        if (!created) {
            await userLoot.increment('quantity', { by: 1 });
        }
    }
    
    setTimeout(async () => {
        await addOrUpdateLoot(user, winnerLootModelObj)
    }, 8000);

    res.status(200).json({ Result_Loot_box })
});



PrivateRoute.post('/getUser', async (req, res) => {
    let telegramId = req.session.telegramId

    // console.log(telegramId)

    try {
        let user = await FindUserByTelegramId(telegramId)
        res.json({ user })
    } catch (error) {
        console.log('err')
    }
})


PrivateRoute.post('/getUserInventory', async (req, res) => {
    let telegramId = req.session.telegramId


    try {
        let user = await FindUserByTelegramId(telegramId)
        if (!user) return

        let userInventory = await user.getUserLoot({
            include: [
                {
                    model: CategoryRare,
                    attributes: ['rareName'] // Включение только названия категории
                }
            ]
        })



        console.log(userInventory)

        res.json({ userInventory })
    } catch (error) {
        console.log('err', error)
    }
})










module.exports = PrivateRoute


