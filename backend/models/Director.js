const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Director = sequelize.define("Director",{
    nombre: {
        type: DataTypes.STRING,
    }
},{
    tableName: "Director",
    timestamps: false
})

module.exports = Director;