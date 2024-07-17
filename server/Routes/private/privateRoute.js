let express = require("express");
const { User, Loot, UserLootInInventory, CategoryRare, InventoryLoot } = require("../../sequelize/models/models");
const { FindUserByTelegramId, GetArLootByCategories, CalculateSellPrice, UserSellLoot } = require("../../sequelize/functoins/functions");
const { RandInt, RandElemFromAr } = require("../../utils/functions");
const { where } = require("sequelize");


let PrivateRoute = express.Router()


PrivateRoute.post('/open', async (req, res) => {
    let telegramId = req.session.telegramId
    const { moneyToOpen } = req.body;

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

        Result_Loot_box.push(loot)
    }

    let winnerLootModelObj = Result_Loot_box[19]


    await user.increment({ money: -moneyToOpen })

    let createdInventoryLoot = await InventoryLoot.findOne({
        where: {
            UserId: user.id,
            img: winnerLootModelObj.img,
            openPrice: moneyToOpen
        }
    })

    if (createdInventoryLoot) {
        createdInventoryLoot.increment('quantity', { by: 1 });
    }
    else {
        let CategoryModel = await CategoryRare.findByPk(winnerLootModelObj.toJSON().CategoryRareId)


        let createdInventoryLoot = await InventoryLoot.create({
            UserId: user.id,
            img: winnerLootModelObj.img,
            openPrice: moneyToOpen
        })

        createdInventoryLoot.setCategoryRare(CategoryModel)

        // console.log(createdInventoryLoot)
    }



    // console.log(createdInventoryLoot)



    async function addOrUpdateLoot(user, loot) {
        // const [userLoot, created] = await UserLootInInventory.findOrCreate({
        //     where: {
        //         UserId: user.id,
        //         LootId: loot.id,
        //         openPrice: moneyToOpen
        //     },
        //     defaults: {
        //         quantity: 1,

        //     }
        // });

        const [userInvLoot, created] = await UserLootInInventory.findOrCreate({
            where: {
                UserId: user.id,
                LootId: loot.id,
                openPrice: moneyToOpen
            }
        });



        if (existingLoot) {
            await existingLoot.increment('quantity', { by: 1 });
        }
        else {
            // await user.addUserLootInInventory(createdInventoryLoot)
            await UserLootInInventory.create({
                UserId: user.id,
                LootId: loot.id,
                quantity: 1,
                openPrice: moneyToOpen
            });
        }
    }

    setTimeout(async () => {
        // await addOrUpdateLoot(user, winnerLootModelObj)
    }, 8000);

    res.status(200).json({ Result_Loot_box })
});


PrivateRoute.post('/getUser', async (req, res) => {
    let { telegramId } = req.body

    if (telegramId) {
        req.session.telegramId = telegramId
    }

    telegramId = req.session.telegramId




    console.log(telegramId)

    try {
        let user = await FindUserByTelegramId(telegramId)
        // if (!user) return res.status(403).end()

        res.status(200).json({ user })
    } catch (error) {
        console.log('err')
    }
})


PrivateRoute.post('/getUserInventory', async (req, res) => {
    let telegramId = req.session.telegramId


    try {
        let user = await FindUserByTelegramId(telegramId)
        if (!user) return res.status(500).end()

        let userInventory = await InventoryLoot.findAll(
            {
                where: { UserId: user.id },
                include: [
                    {
                        model: CategoryRare,
                        attributes: ['rareName']
                    }
                ]
            }
        )

        const plainUserInventory = userInventory.map(item => item.get({ plain: true }));
        if (!plainUserInventory) return res.end()
        for (const item of plainUserInventory) {

            item.sellPriceInfo = await CalculateSellPrice({ user, itemIdInDb: item.id });
        }

        console.log(plainUserInventory)

        res.json({ userInventory: plainUserInventory })
    } catch (error) {
        console.log('err', error)
    }
})



PrivateRoute.post('/sellItem', async (req, res) => {
    let telegramId = req.session.telegramId
    let { itemIdInDb, isSellAll } = req.body

    console.log(itemIdInDb, isSellAll)

    try {
        let user = await FindUserByTelegramId(telegramId)
        if (!user) return res.status(500).end()

        await UserSellLoot({ user, itemIdInDb, isSellAll })

        res.status(200).json({})
    } catch (error) {
        console.log('err', error)
        res.status(500)
    }
})







module.exports = PrivateRoute


