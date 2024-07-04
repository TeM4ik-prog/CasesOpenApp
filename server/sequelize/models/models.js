const { DataTypes, INTEGER } = require("sequelize");
const { sequelize } = require("../config/SequelizeConfig");


const UserLootInInventory = sequelize.define('UserLootInInventory', {
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    InventoryLootId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // quantity: {
    //     type: DataTypes.INTEGER,
    //     defaultValue: 1
    // },
    // openPrice: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     unique: false
    // }
},
    {
        tableName: 'UserLootInInventory',
        onDelete: 'CASCADE',

        // indexes: [],
        // uniqueKeys: {}
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
        defaultValue: 1000,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    }
});


const CategoryRare = sequelize.define('CategoryRare', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,

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


const InventoryLoot = sequelize.define('InventoryLoot', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    img: {
        type: DataTypes.STRING,
        allowNull: false
    },

    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    openPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});









// для категорий товаров
CategoryRare.hasMany(Loot, { onDelete: 'CASCADE' });
Loot.belongsTo(CategoryRare, { onDelete: 'CASCADE' });


// для категорий товаров
CategoryRare.hasMany(InventoryLoot, { onDelete: 'CASCADE' });
InventoryLoot.belongsTo(CategoryRare, { onDelete: 'CASCADE' });



// для лута пользователя
User.belongsToMany(Loot, { through: UserLootInInventory, as: "UserLoot", onDelete: 'CASCADE' });
InventoryLoot.belongsToMany(User, { through: UserLootInInventory, as: "UserLoot", onDelete: 'CASCADE' });




// Определение связи с моделью Loot
// InventoryLoot.belongsTo(Loot, { foreignKey: 'lootId' });

module.exports = {
    User,
    Loot,
    CategoryRare,
    UserLootInInventory,
    InventoryLoot
}