const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./db/sequelize");
const express = require("express"); // npm install express

const PORT = process.env.PORT || 5000;
const app = express();

app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(cors())
  .use(express.urlencoded({ extended: true }))
  .use(express.static(__dirname + "../client"));

sequelize.initdb();

require("./routes/register")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
