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
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(Auth_session())

app.use(express.json());



// app.use(express.static(path.join(__dirname, "public")))
// app.use(AuthRoute)



app.get("/", (req, res) => {

    req.session.telegramId = 'artem'


    console.log(req.session.telegramId)

    res.end()
})

app.post('/login', async (req, res) => {
    const { telegramId, username } = req.body;

    console.log(username)

    req.session.telegramId = telegramId

    console.log(req.session.telegramId)


    res.end()
});



app.get("/test", (req, res) => {
    let test = req.session.telegramId

    console.log(req.session.telegramId)


    res.send(`<h1>${test}</h1>`)
})

app.post('/getUser', async (req, res) => {
    let telegramId = req.session.telegramId

    console.log(telegramId)

    // let user = await User.findOne({ where: { telegramId: telegramId } });


    // console.log(user)


    res.json({ telegramId })


})





app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});