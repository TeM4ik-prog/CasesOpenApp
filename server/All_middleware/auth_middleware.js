let session = require("express-session")
const crypto = require("crypto");
const { sequelize } = require("../sequelize/config/SequelizeConfig");

// const sessionStore = new SequelizeStore({
//     db: sequelize, // ваше подключение к базе данных Sequelize
// });

function Auth_session() {
    return session({
        secret: crypto.randomBytes(32).toString("hex"),
        resave: false,
        saveUninitialized: true,
        // store: sessionStore,
        // cookie: { secure: false }
    })
}




function checkAuth(req, res, next) {
    if (!req.session.username) {
        return res.status(404)
    }
    next()
}





module.exports = {
    Auth_session,
    checkAuth
}