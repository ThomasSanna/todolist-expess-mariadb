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
  .use(cors())
  .use(express.urlencoded({ extended: true }))
  .use(express.static(__dirname + "/public"))
  .use(express.json())
  .use(session({
    secret: "blablabalbauheuhuhuaizheiuhuizheiu",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));


sequelize.initdb();

require("./routes/register")(app);
require("./routes/logout")(app);
require("./routes/getUser")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
