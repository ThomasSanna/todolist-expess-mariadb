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
  table: "Session",
})
sessionStore.sync();

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
  sequelize.Sessio
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});