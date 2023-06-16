const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./db/sequelize");
const express = require("express"); // npm install express
const session = require("express-session"); // npm install express-session

const PORT = process.env.PORT || 5000;
const app = express();

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
  secret: "blablabalbauheuhuhuaizheiuhuizheiu",
  resave: true,
  saveUninitialized: true,
  rolling: false,
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  }
  }))

sequelize.initdb();

require("./routes/register")(app);



app.get("/", (req, res) => {
  console.log('onGetSession', req.session);
  if (req.session.userId) {
    return res.json({
      'UserId': req.session,
      'Views': req.session.views,
    });
  } else {
    return res.json({"id": "No id found"});
  }
})

app.get('/test', (req, res, next) => {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});