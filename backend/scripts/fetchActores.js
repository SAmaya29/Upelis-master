const axios = require('axios');
const Actor = require('../models/Actor');

const fetchActores = async () => {
    try {
        let page = 1;
        let totalPages;
        do {
            const response = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=1b78b245b327bafade8899cf30a25a87&language=en-US&page=${page}`);
            const actores = response.data.results; 
            totalPages = response.data.total_pages; // Obtener el total de páginas;         

            for (let actorData of actores) {
                const actorExistente = await Actor.findOne({ where: { nombre: actorData.name } });            
                if (!actorExistente) {
                    await Actor.create({ nombre: actorData.name });
                }
            }

            console.log(`Actores de la página ${page} insertados correctamente`);
            page++; // Incrementar el número de página para la próxima solicitud
        } while (page <= totalPages); // Continuar mientras haya más páginas

        console.log("Todos los actores insertados correctamente");
    } catch (error) {
        console.error("Error al insertar actores:", error);
    }
}

module.exports = { fetchActores };

