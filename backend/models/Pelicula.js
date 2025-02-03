const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Pelicula = sequelize.define('Pelicula', {
    titulo: {
        type: DataTypes.STRING,
    },
    duracion: {
        type: DataTypes.INTEGER,
    },
    sinopsis: {
        type: DataTypes.TEXT,
    },
    calificacion: {
        type: DataTypes.INTEGER,
    },
    caratula: {
        type: DataTypes.TEXT,
    },
    año_estreno: {
        type: DataTypes.DATE
    },
    slug: {
        type: DataTypes.STRING,
    },
}, {
    tableName: "Pelicula",
    timestamps: false,
    //Funcion para crear el slug unico de cada pelicula
    hooks: {
        //Antes de insertar la Pelicula en la base de datos se crea el slug con el nombre
        //de la pelicula sin espacion y en minuscula
        beforeCreate: (Pelicula) => {
            Pelicula.slug = Pelicula.titulo.toLowerCase().replace(/ /g, "-")
        },
        //Despues de insertar la pelicula en la bd ya teniendo el id se actualiza el slug
        //añadiendole al slug anterior el id de la pelicula
        afterCreate: async (Pelicula) => {
            Pelicula.slug = `${Pelicula.slug}/${Pelicula.id}`;
            await Pelicula.update({ slug: Pelicula.slug }); // Actualiza solo el slug
        }        
    }
});

module.exports = Pelicula;