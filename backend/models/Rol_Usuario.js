const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Rol_Usuario = sequelize.define("Rol_Usuario",{
    nombre: {
        type: DataTypes.STRING,
    }
},{
    tableName: "Rol_Usuario",
    timestamps: false
})

module.exports = Rol_Usuario;