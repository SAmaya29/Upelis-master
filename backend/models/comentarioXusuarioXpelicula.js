const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Comentario = require('./Comentario');
const Usuario = require('./Usuario');
const Pelicula = require('./Pelicula');

const comentarioXusuarioXpelicula = sequelize.define("comentarioXusuarioXpelicula",{
    id_comentario: {
        type: DataTypes.INTEGER,
        references: {
            model: Comentario,
            key: "id"
        }
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: "id"
        }
    },
    id_pelicula: {
        type: DataTypes.INTEGER,
        references: {
            model: Pelicula,
            key: "id"
        }
    }
},{
    tableName: "comentarioXusuarioXpelicula",
    timestamps: false
})

module.exports = comentarioXusuarioXpelicula;