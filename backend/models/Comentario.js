const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Comentario = sequelize.define("Comentario",{
    comentario: {
        type: DataTypes.TEXT,
    },
    fecha: {
        type: DataTypes.DATE,
    }
},{
    tableName: "Comentario",
    timestamps: false
})

module.exports = Comentario;