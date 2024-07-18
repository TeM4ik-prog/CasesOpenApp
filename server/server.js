const express = require('express');
const { User } = require('./sequelize/models/models');
const { Auth_session } = require('./All_middleware/auth_middleware');
const AuthRoute = require('./Routes/private/Auth');
let cors = require('cors')

const path = require('path');
const { sequelize } = require('./sequelize/config/SequelizeConfig');
const PrivateRoute = require('./Routes/private/privateRoute');
const { CreateLootRare } = require('./sequelize/functoins/functions');
const StatisticRoute = require('./Routes/private/statisticRoute');
const GameRoute = require('./Routes/private/GameRoute');

const app = express();
const port = 5000;



// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


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

app.use('/auth', AuthRoute)
app.use('/private', PrivateRoute)
app.use('/game', GameRoute)
app.use('/stat', StatisticRoute)



async function startServer() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });//удаление всех бд

        console.log('Соединение с базой данных установлено');


        let user = await User.findOne({ where: { telegramId: '2027571609' } });
        if (!user) {
            user = await User.create({ telegramId: '2027571609', username: 'TeM4ik20' });
        }

        await CreateLootRare()

        app.listen(port, () => {
            console.log(`Сервер запущен на порту ${port}`);
        });
    } catch (error) {
        console.error('Ошибка при запуске сервера:', error);
    }
}


startServer()
