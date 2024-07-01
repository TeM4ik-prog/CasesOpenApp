const { LootCreateObj } = require("../Loot/box_loot");
const { LootRare } = require("../config/LootRare");
const { User, CategoryRare, Loot } = require("../models/models");

async function FindUserByTelegramId(telegramId) {
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
            include: { model: Loot }
        });

        const arName = `${rareName}Ar`
        ObjOfLootArs[arName] = CategoryRareWithLoot.Loots
    }
    // console.log(ObjOfLootArs)

    return ObjOfLootArs
}






module.exports = {
    FindUserByTelegramId,
    CreateLootRare,
    GetArLootByCategories
}