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




const BombDefuserGameData = sequelize.define('BombDefuserGameData', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },


    speed_boost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1

    },

    time_boost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1

    },

    money_boost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1

    },

    focus_boost: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1

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


BombDefuserGameData.belongsTo(User, { as: "BombDefuserData", foreignKey: 'UserId', onDelete: 'CASCADE' })
User.hasOne(BombDefuserGameData, { as: "BombDefuserData", foreignKey: 'UserId', onDelete: 'CASCADE' })






User.afterCreate(async (user, options) => {
    await BombDefuserGameData.create({ UserId: user.id });
});



module.exports = {
    User,
    Loot,
    CategoryRare,
    UserLootInInventory,
    InventoryLoot,
    BombDefuserGameData

}