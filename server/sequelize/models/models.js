const { DataTypes, INTEGER } = require("sequelize");
const { sequelize } = require("../config/SequelizeConfig");

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




module.exports = {
    User
}