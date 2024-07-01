const { DataTypes } = require("sequelize");
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
    }
});

sequelize.sync()
    .then(() => console.log('Database & tables created!'))
    .catch(err => console.error('Unable to create table:', err));



module.exports = {
    User
}