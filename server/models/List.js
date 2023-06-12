module.exports = (sequelize, DataTypes) => {
    return sequelize.define('list', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        iduser: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        task: {
            type: DataTypes.STRING,
            allowNull: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }

    });
};