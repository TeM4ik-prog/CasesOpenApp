const express = require('express');
const { User } = require('./sequelize/models/models');
const { Auth_session } = require('./All_middleware/auth_middleware');
const AuthRoute = require('./Routes/private/Auth');
let cors = require('cors')

const path = require('path')

const app = express();
const port = 5000;



// app.use(cors());
app.use(cors({
    origin: ['http://localhost:5173', 'https://tgwebappbytem4ik.netlify.app'], // Разрешаем локальный и деплоенный фронтенд
    credentials: true // Разрешаем передачу куки
}));

app.use(Auth_session())

app.use(express.json());



// app.use(express.static(path.join(__dirname, "public")))
// app.use(AuthRoute)



app.get("/", (req, res) => {

    req.session.telegramId = '2027571609'


    console.log(req.session.telegramId)

    res.end()
})

app.post('/api/login', async (req, res) => {
    const { telegramId, username } = req.body;

    req.session.telegramId = telegramId

    console.log(req.session.telegramId)

    res.status(200).end()
});



app.get("/api/test", (req, res) => {
    let test = req.session.telegramId

    console.log(req.session.telegramId)


    res.send(`<h1>${test}</h1>`)
})

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





app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});