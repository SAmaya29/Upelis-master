const { fetchPeliculas } = require('./fetchPeliculas');
const { fetchGeneros } = require('./fetchGeneros');
const { fetchActores } = require('./fetchActores');

const startProcess = async () => {
    try {
        await fetchGeneros();   // Primero inserta géneros
        await fetchActores();   // Después inserta actores
        await fetchPeliculas();  // Finalmente inserta las películas
    } catch (error) {
        console.error("Error en el proceso:", error);
    }
};
startProcess();
