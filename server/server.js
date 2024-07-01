const express = require('express');
const { User } = require('./sequelize/models/models');
const { Auth_session } = require('./All_middleware/auth_middleware');
const AuthRoute = require('./Routes/private/Auth');
let cors = require('cors')

const path = require('path');
const { sequelize } = require('./sequelize/config/SequelizeConfig');

const app = express();
const port = 5000;


app.use(express.static(path.join(__dirname, "../client/dist")));
//без этого не работает, только если переходить через Link 
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});


// // app.use(cors());
// app.use(cors({
//     origin: ['http://localhost:5173', 'https://tgwebappbytem4ik.netlify.app', 'https://2c9e6a87-f33c-4f5c-8a80-1e8a865399e2-00-3mrn4svuqot5h.spock.replit.dev'], // Разрешаем локальный и деплоенный фронтенд
//     credentials: true // Разрешаем передачу куки
// }));

app.use(Auth_session())

app.use(express.json());

app.use(express.static(path.join(__dirname, "./public")))


// app.use(AuthRoute)
app.post('/api/login', async (req, res) => {
    const { telegramId, username } = req.body;

    req.session.telegramId = telegramId

    console.log(req.session.telegramId)

    res.status(200).end()
});

app.post('/api/getUser', async (req, res) => {
    let telegramId = req.session.telegramId

    console.log(telegramId)

    try {
        let user = await User.findOne({ where: { telegramId: telegramId } });
        console.log(user)
        res.json({ user })
    } catch (error) {
        console.log('err')
    }
})


app.get("/api/test", (req, res) => {
    let test = req.session.telegramId

    console.log(req.session.telegramId)


    res.send(`<h1>${test}</h1>`)
})




async function startServer() {
    try {
        await sequelize.authenticate();
        // await sequelize.sync({ force: true });//удаление всех бд

        console.log('Соединение с базой данных установлено');

        // await CreateOrFindUncategorized()
        // await OnCreateCategories();

        app.listen(port, () => {
            console.log(`Сервер запущен на порту ${port}`);
        });
    } catch (error) {
        console.error('Ошибка при запуске сервера:', error);
    }
}


startServer()
