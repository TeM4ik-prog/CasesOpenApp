const { DataTypes, INTEGER } = require("sequelize");
const { sequelize } = require("../config/SequelizeConfig");


const UserLootInInventory = sequelize.define('UserLootInInventory', {
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
}, {
    tableName: 'UserLootInInventory',
    onDelete: 'CASCADE'
});


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    telegramId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true
    },

    money: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
        allowNull: false
    }
});


const CategoryRare = sequelize.define('CategoryRare', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    rareName: {
        type: DataTypes.STRING,
        allowNull: false
    },
})


const Loot = sequelize.define('Loot', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    img: {
        type: DataTypes.STRING,
        allowNull: false
    },

})


// для категорий товаров
CategoryRare.hasMany(Loot, { onDelete: 'CASCADE' });
Loot.belongsTo(CategoryRare, { onDelete: 'CASCADE' });



// для лута пользователя
User.belongsToMany(Loot, { through: UserLootInInventory, as: "UserLoot", onDelete: 'CASCADE' });
Loot.belongsToMany(User, { through: UserLootInInventory, as: "UserLoot", onDelete: 'CASCADE' });




module.exports = {
    User,
    Loot,
    CategoryRare,
    UserLootInInventory
}