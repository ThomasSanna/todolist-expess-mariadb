const sequelize = require("../db/sequelize.js");
const bcrypt = require("bcrypt"); // npm install bcrypt

module.exports = function (app) {

  app.get("/register", (req, res) => {
    res.redirect('http://localhost:3000/register')
  });

  app.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (!username) {
      return res.send("Username is required");
    }
    sequelize.User.findOne({ where: { username } }).then((userCreated) => {
      if (!userCreated) {
        bcrypt.hash(password, 10).then((hash) => {
          sequelize.User.create({ username, password: hash })
            .then((userCreated) => {
              req.session.userId = userCreated.id;
              console.log('onRegisterSession: ', req.session);
              res.end()
            })
            .catch((err) => {
              console.error(err);
              return res.status(500).json({ err });
            })
        })
      } else {
        return res.status(409).json("Username already taken");
      }
    });
  });
};