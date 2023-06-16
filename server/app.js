const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./db/sequelize");
const express = require("express"); // npm install express
const session = require("express-session"); // npm install express-session
const SequelizeStore = require("connect-session-sequelize")(session.Store);


const PORT = process.env.PORT || 5000;
const app = express();

const sessionStore = new SequelizeStore({
  db: sequelize.sequelizeSecond,
  saveUninitialized: true, // don't create session until something stored,
  checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
  expiration: 24 * 60 * 60 * 1000, // The maximum age (in milliseconds) of a valid session.
})


app.set('trust proxy', 1)

app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }))
  .use(express.urlencoded({ extended: true }))
  .use(express.static(__dirname + "/public"))
  .use(express.json())

  .use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 *24 * 7, // 1 week
    },
    store: sessionStore
  }))


sequelize.initdb();

require("./routes/register")(app);


// get user from sequelize session db
app.get("/getuser", (req, res) => {
  console.log({ 'sessionID': req.sessionID });
  sequelize.Session.findOne({ where: { data: req.sessionID } })
    .then(session => {
      console.log('====================================');
      console.log({ 'session': session });
      console.log('====================================');
    })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});