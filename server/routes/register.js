const sequelize = require("../db/sequelize.js");
const bcrypt = require("bcrypt"); // npm install bcrypt

module.exports = function (app) {
  app.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (!username) {
      res.send("Username is required");
      return;
    }
    sequelize.User.findOne({ where: { username } }).then((user) => {
      if (!user) {
        bcrypt.hash(password, 10).then((hash) => {
          sequelize.User.create({ username, password: hash })
            .then((user) => {
              res.redirect(`/profile/${user.id}`);
            })
            .catch((err) => {
              console.error(err);
              res.send("Error");
            });
        });
      } else {
        res.send("Username already taken");
      }
    });
  });
};
