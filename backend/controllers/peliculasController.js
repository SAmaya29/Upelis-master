const Pelicula = require('../models/Pelicula');
const Genero = require('../models/Genero');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
require('../models/Relaciones')
const { Op } = require('sequelize');
const sequelize = require('../database/db');


// Obtener todas las películas
const getPeliculas = async (req, res) => {
    try {
        const peliculas = await Pelicula.findAll();
        res.json(peliculas);
    } catch (error) {
        console.error(error); // Agrega esta línea para ver el error
        res.status(500).json({ message: "Error al obtener las películas." });
    }
};

// Obtener películas por género
const getPeliculasPorGenero = async (req, res) => {
    try {
        const { id } = req.params;
        const genero = await Genero.findByPk(id, {
        include: [{ model: Pelicula }]
        });
        //console.log(genero)
        res.json(genero.Peliculas || []);
        //res.json(genero ? genero.Peliculas : []);
    } catch (error) {
        console.error(error); // Agrega esta línea para ver el error
        res.status(500).json({ message: "Error al obtener películas por género." });
    }
};

// Obtener películas por actor
const getPeliculasPorActor = async (req, res) => {
    try {
        const { id } = req.params;
        const actor = await Actor.findByPk(id, {
        include: [{ model: Actor }]
        });
        //console.log(actor)
        res.json(actor.Peliculas || []);
        //res.json(actor ? actor.Peliculas : []);
    } catch (error) {
        console.error(error); // Agrega esta línea para ver el error
        res.status(500).json({ message: "Error al obtener películas por actor." });
    }
};

// Obtener peliculas por x año_estreno
const getPeliculasAno = async (req, res) => {
    try {
        const { year } = req.params
        // Definir el rango de fechas del año
        const inicioAño = new Date(`${year}-01-01`);
        const finAño = new Date(`${year}-12-31`);

        // Buscar películas con año_estreno dentro del rango
        const peliculas = await Pelicula.findAll({
            where: {
                año_estreno: {
                    [Op.between]: [inicioAño, finAño]
                }
            }
        });
        res.json(peliculas)
    } catch (error) {
        console.error(error); // Agrega esta línea para ver el error
        res.status(500).json({ message: "Error al obtener películas por año." });
    }
}


// Obtener películas por director
const getPeliculasPorDirector = async (req, res) => {
    try {
        const { id } = req.params;
        const director = await Director.findByPk(id, {
        include: [{ model: Director }]
        });
        res.json(director.Peliculas || []);
        //res.json(director ? director.Peliculas : []);
    } catch (error) {
        console.error(error); // Agrega esta línea para ver el error
        res.status(500).json({ message: "Error al obtener películas por director." });
    }
};

// Obtener los generos guardados de la bd
const getGeneros = async (req, res) => {
    try {
        const generos = await Genero.findAll()
        res.json(generos)
    } catch (error) {
        console.error(error); // Agrega esta línea para ver el error
        res.status(500).json({ message: "Error al obtener los generos." });
    }
}

//Hay que modificar
const getPeliculasEstrenos = async (req, res) => {
    try {
        const fechaActual = new Date();
        const unAnoAtras = new Date();
        unAnoAtras.setFullYear(fechaActual.getFullYear() - 1);

        const estrenos = await Pelicula.findAll({
            where: {
                año_estreno: {
                    [Op.gte]: unAnoAtras // Filtra películas estrenadas en el último año
                }
            }
        });
        res.json(estrenos);
    } catch (error) {
        console.error("Error al obtener estrenos de películas:", error);
        res.status(500).json({ message: "Error al obtener estrenos de películas." });
    }
};

//Obetener los años unicos que hay en la bd
const getAniosUnicos = async (req, res) => {
    try {
        const anios = await Pelicula.findAll({
            attributes: [
                [sequelize.fn('DISTINCT', sequelize.fn('YEAR', sequelize.col('año_estreno'))), 'año_estreno']
            ],
            order: [[sequelize.col('año_estreno'), 'DESC']]
        });

        const aniosFormateados = anios.map(p => p.año_estreno);

        res.json(aniosFormateados);
    } catch (error) {
        console.error('Error al obtener años únicos:', error);
        res.status(500).json({ message: 'Error al obtener años únicos.' });
    }
};



const getMoviesSearch = async (req, res) => {
    try {
        const { nombre } = req.params; // Parámetro de búsqueda
        const peliculas = await Pelicula.findAll({
            where: {
                titulo: {
                    [Op.like]: `%${nombre}%` // Sequelize operador LIKE
                }
            }
        });
        if (peliculas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron películas.' });
        }
        res.json(peliculas);
        console.log(peliculas)
    } catch (error) {
        //console.error(error);
        res.status(500).json({ error: 'Error al buscar la película.' });
    }
};

module.exports = {
    getPeliculas,
    getPeliculasPorGenero,
    getPeliculasPorActor,
    getPeliculasPorDirector,
    getGeneros,
    getPeliculasEstrenos,
    getPeliculasAno,
    getAniosUnicos,
    getMoviesSearch
};
