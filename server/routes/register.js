const sequelize = require("../db/sequelize.js");
const bcrypt = require("bcrypt"); // npm install bcrypt


module.exports = function (router) {

  router.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (!username) {
      res.send("Username is required");
      return;
    }
    sequelize.User.findOne({ where: { username } }).then((userCreated) => {
      if (!userCreated) {
        bcrypt.hash(password, 10).then((hash) => {
          sequelize.User.create({ username, password: hash })
            .then((userCreated) => {
              req.session.user = userCreated;
              res.status(200).json({ data: userCreated });
              res.redirect('http://localhost:3000/');
            })
            .catch((err) => {
              console.error(err);
              res.status(500).json({ err });
            });
        });
      } else {
        res.status(409).json("Username already taken");
      }
    });
  });
};
