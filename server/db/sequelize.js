const { Sequelize } = require('sequelize');
const listModel = require('../models/List');
const userModel = require('../models/User');

const sequelize = new Sequelize('todolist', 'root', '', {
    dialect: 'mariadb',
    host: 'localhost',
    dialectOptions: {
        timezone: 'Etc/GMT-2'
    }
});

const List = listModel(sequelize, Sequelize.DataTypes);
const User = userModel(sequelize, Sequelize.DataTypes);

const initdb = () => {
    return sequelize.sync()
        .then(() => {

            return List.sync({ force: true })
        })
        .then(() => {
            return User.sync({ force: true })
        })
        .then(() => {
            console.log('Database & tables created!');
        })
        .catch(err => { console.error('Unable to connect to the database:', err.message); });
}

module.exports = {
    initdb, List, User
}