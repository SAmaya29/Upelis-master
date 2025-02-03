const axios = require('axios');
const Genero = require('../models/Genero');

const fetchGeneros = async () => {
    try {
        let page = 1;
        let totalPages;
        do {            
            const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=1b78b245b327bafade8899cf30a25a87&language=en-US&page=${page}`);
            const generos = response.data.genres;
            totalPages = response.data.total_pages; // Obtener el total de páginas;
            
            for (let generoData of generos) {
                const generoExistente = await Genero.findOne({ where: { nombre: generoData.name } });
                if(!generoExistente){
                    await Genero.create({ nombre: generoData.name });
                }
            }
            console.log(`Actores de la página ${page} insertados correctamente`);
            page++; // Incrementar el número de página para la próxima solicitud
        } while (page <= totalPages);
        
        console.log("Géneros insertados correctamente");
    } catch (error) {
        console.error("Error al insertar géneros:", error);
    }
}

module.exports = { fetchGeneros };
