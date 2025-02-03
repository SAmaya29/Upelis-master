const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Rol_Usuario = require('./Rol_Usuario');

const Usuario = sequelize.define("Usuario",{
    nombre: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    id_rol: {
        type: DataTypes.INTEGER,
        references: {
            model: Rol_Usuario,
            key: "id" 
        }       
    }
},{
    tableName: "Usuario",
    timestamps: false
})

module.exports = Usuario;