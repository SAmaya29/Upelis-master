const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Genero = sequelize.define("Genero",{
    nombre: {
        type: DataTypes.STRING,
    }
},{
    tableName: "Genero",
    timestamps: false
})

module.exports = Genero;