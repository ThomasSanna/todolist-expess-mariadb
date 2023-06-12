const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./db/sequelize');
const express = require('express'); // npm install express
const session = require('express-session'); // npm install express-session
const http = require('http'); // npm install http
const socketIO = require('socket.io'); // npm install socket.io

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app
    .use(bodyParser.json())
    .use(cors())
    .use(session({
        secret: 'secret',
        resave: true, // sert à sauvegarder la session à chaque requête même si elle n'est pas modifiée
        saveUninitialized: true // sert à stocker les sessions côté serveur même si elles sont vides
    }))

sequelize.initdb();


const checkAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

app.get('/', checkAuth, (req, res) => {
    res.send('Hello World!');
});

app.get('/login', (req, res) => {
    if (req.session.user) {
        res.redirect('/');
    } else {
        res.send('');
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = sequelize.User.findOne({ where: { username, password } })
        .then(user => {
            if (user) {
                req.session.user = user;
                res.redirect('/');
            } else {
                res.send('Wrong username or password');
            }
        })
        .catch(err => {
            console.error(err);
            res.send('Error');
        });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if(!sequelize.User.findOne({ where: { username } })){
        sequelize.User.create({ username, password })
            .then(user => {
                req.session.user = user;
                res.redirect('/');
            })
            .catch(err => {
                console.error(err);
                res.send('Error');
            });
    } else {
        res.send('Username already taken');
    }
});

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.emit('message', 'Hello from server');
    socket.on("message", (data) => {
        console.log("received message: ", data);
    });
});

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});