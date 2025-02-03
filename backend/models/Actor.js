const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Actor = sequelize.define("Actor",{
    nombre: {
        type: DataTypes.STRING,
    }
},{
    tableName: "Actor",
    timestamps: false
})

module.exports = Actor;