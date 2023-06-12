module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: {
                args: true,
                msg: 'Username already exists'
            }
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false,
            min: {
                args: 8,
                msg: 'Password must be at least 8 characters in length'
            },
        },
    });
};