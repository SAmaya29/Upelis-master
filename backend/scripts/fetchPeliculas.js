const axios = require('axios');
const Pelicula = require('../models/Pelicula')
const Genero = require('../models/Genero');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
require('../models/Relaciones');

const obtenerDetallesPelicula = async (peliculaId) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${peliculaId}?api_key=1b78b245b327bafade8899cf30a25a87&language=en-US`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener detalles de la película:', error);
        return null;
    }
};

const fetchPeliculas = async () => {
    try {
        let page = 1;
        let totalPages;

        do {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=1b78b245b327bafade8899cf30a25a87&language=en-US&page=${page}`);
            const peliculas = response.data.results;
            totalPages = response.data.total_pages; // Obtener el total de páginas;
            
            for (let peliculaData of peliculas) {
                const detallesPelicula = await obtenerDetallesPelicula(peliculaData.id);
                if (!detallesPelicula) continue;  // Si no se pudieron obtener los detalles
                                                  //, saltar a la siguiente película
                // Verifica si año_estreno tiene un valor válido
                const añoEstreno = detallesPelicula.release_date || null;  // Si no hay fecha, será null

                if (!añoEstreno) {
                    console.error(`Año de estreno no disponible para la película: ${peliculaData.title}`);
                    continue; // Saltar a la siguiente película
                }
                const nuevaPelicula = await Pelicula.create({
                    titulo: peliculaData.title,
                    duracion: detallesPelicula.runtime,
                    sinopsis: peliculaData.overview,
                    caratula: peliculaData.poster_path,
                    año_estreno: peliculaData.release_date
                });

                // Obtener los géneros de la película desde los detalles y asociarlos
                const peliculaGeneros = detallesPelicula.genres.map(genero => genero.name);

                for (let generoNombre of peliculaGeneros) {
                    const genero = await Genero.findOne({ where: { nombre: generoNombre } });
                    if (genero) {
                        await nuevaPelicula.addGenero(genero); // Relacionar con el género encontrado
                    } else {
                        console.error(`Género con nombre ${generoNombre} no encontrado en la base de datos`);
                    }
                }

                const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${peliculaData.id}/credits?api_key=1b78b245b327bafade8899cf30a25a87&language=en-US&page=${page}`);
                const { cast: actores, crew: equipo } = creditsResponse.data;

                for(let actorData of actores){
                    const actor = await Actor.findOne({ where: { nombre: actorData.name } });
                    if (actor){
                        await nuevaPelicula.addActor(actor)
                    }else{
                        const nuevoActor = await Actor.create({ nombre: actorData.name });
                        await nuevaPelicula.addActor(nuevoActor);
                    }
                }
                const directores = equipo.filter(persona => persona.job === 'Director');
                for(let directorData of directores){
                    const director = await Director.findOne({ where: { nombre: directorData.name } });
                    if (director){
                        await nuevaPelicula.addDirector(director)
                    }else{
                        const nuevoDirector = await Director.create({ nombre: directorData.name})
                        await nuevaPelicula.addDirector(nuevoDirector)
                    }
                }
            }
            console.log(`Peliculas de la página ${page} insertados correctamente`);
            page++; // Incrementar el número de página para la próxima solicitud
        } while (page <= totalPages);   
    } catch (error) {
        console.error("Error al insertar las películas:", error);
    }
}

module.exports = { fetchPeliculas };
