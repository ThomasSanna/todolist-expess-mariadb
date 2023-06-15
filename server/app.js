const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./db/sequelize");
const express = require("express"); // npm install express
const session = require("express-session"); // npm install express-session

const PORT = process.env.PORT || 5000;
const app = express();
const router = express.Router();

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
  secret: "blablabalbauheuhuhuaizheiuhuizheiu",
  resave: true,
  saveUninitialized: false,
  rolling: true, // set rolling to false to prevent session from being reset on page refresh
  cookie: { 
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  }
  }))
  .use(function (req, res, next) {
    res.locals.user = req.session.user;
    next();
  })


sequelize.initdb();

require("./routes/register")(app);
require("./routes/logout")(app);
require("./routes/getUser")(app);



app.get("/", (req, res) => {
  console.log('session', req.session.user);
  if (req.session.user) {
    return res.json({ username: req.session });
  } else {
    return res.json({ username: null });
  }
})



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});