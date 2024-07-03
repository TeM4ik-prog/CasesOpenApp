const { LootCreateObj } = require("../Loot/box_loot");
const { ReturnSellCoefficientByCategoryId } = require("../Loot/loot_sellConf");
const { LootRare } = require("../config/LootRare");
const { User, CategoryRare, Loot, InventoryLoot } = require("../models/models");

async function FindUserByTelegramId(telegramId) {
    if (!telegramId) return null
    return await User.findOne({
        where: { telegramId: telegramId },
        attributes: { exclude: ['telegramId'] }
    });
}

async function CreateLootRare() {
    for (const rareName in LootCreateObj) {
        try {
            const [createdCategoryRare] = await CategoryRare.findOrCreate({ where: { rareName } });

            for (const loot of LootCreateObj[rareName]) {
                let [createdLoot] = await Loot.findOrCreate({ where: loot })

                await createdLoot.setCategoryRare(createdCategoryRare)

                // console.log(createdLoot)
            }

        } catch (error) {
            console.error(`Error processing`, error);
        }
    }

}

async function GetArLootByCategories() {
    let ObjOfLootArs = []

    for (const rareName in LootCreateObj) {
        let CategoryRareWithLoot = await CategoryRare.findOne({
            where: { rareName },
            include: {
                model: Loot,
                include: [
                    {
                        model: CategoryRare,
                        attributes: ['rareName'] // Включение только названия категории
                    }
                ]
            }
        });

        const arName = `${rareName}Ar`
        ObjOfLootArs[arName] = CategoryRareWithLoot.Loots
    }
    // console.log(ObjOfLootArs)

    return ObjOfLootArs
}

function UserSellLoot({ userModel, itemIdInDb, isSellAll }) {




}


// async function Find


async function UserSellLoot({ user, itemIdInDb, isSellAll }) {
    let itemModel = await InventoryLoot.findOne({
        where: { UserId: user.id, id: itemIdInDb }
    })

    if (!itemModel) return

    if (!isSellAll) {
        await user.increment({ money: (await CalculateSellPrice({ user, itemIdInDb })).sellOne })
        await itemModel.increment({ quantity: -1 })
        await itemModel.reload();

        if (itemModel.quantity == 0) {
            await itemModel.destroy()
        }
    }
    else {
        await user.increment({ money: (await CalculateSellPrice({ user, itemIdInDb, isSellAll })).sellAll })
        await itemModel.update({ quantity: 0 })
        await itemModel.destroy()
    }
}


async function CalculateSellPrice({ user, itemIdInDb }) {
    let ObjPriceResult = {}
    let itemModel = await InventoryLoot.findOne({
        where: { UserId: user.id, id: itemIdInDb }
    })

    let SellCoefficient = await ReturnSellCoefficientByCategoryId(itemModel.CategoryRareId)

    ObjPriceResult.sellOne = Number((itemModel.openPrice * SellCoefficient).toFixed(2))
    ObjPriceResult.sellAll = Number((itemModel.quantity * itemModel.openPrice * SellCoefficient).toFixed(2))

    return ObjPriceResult
}








module.exports = {
    FindUserByTelegramId,
    CreateLootRare,
    GetArLootByCategories,
    CalculateSellPrice,
    UserSellLoot
}