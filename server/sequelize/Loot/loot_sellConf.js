const { CategoryRare } = require("../models/models")

async function ReturnSellCoefficientByCategoryId(CategoryId) {
    let CategoryName = (await CategoryRare.findByPk(CategoryId)).toJSON().rareName

    let Coefficient
    switch (CategoryName) {
        case 'common':
            Coefficient = 0.33
            break;
        case 'uncommon':
            Coefficient = 1.5
            break;
        case 'epic':
            Coefficient = 3
            break;
        case 'legendary':
            Coefficient = 8
            break;
    }

    return Coefficient
}


module.exports = {
    ReturnSellCoefficientByCategoryId
} 