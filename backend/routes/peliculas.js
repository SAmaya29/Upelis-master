const express = require('express');
const router = express.Router();
const { getPeliculas, getPeliculasPorGenero, getPeliculasPorActor, getPeliculasPorDirector, getAniosUnicos, getGeneros, getPeliculasEstrenos, getPeliculasAno, getMoviesSearch } = require('../controllers/peliculasController');
const mysql = require('mysql2/promise');
const Usuario = require('../models/Usuario');

router.get('/', getPeliculas);
router.get('/genero/:id', getPeliculasPorGenero);
router.get('/actor/:id', getPeliculasPorActor);
router.get('/director/:id', getPeliculasPorDirector);
router.get('/generos', getGeneros)
router.get('/peliculas/estrenos', getPeliculasEstrenos)
router.get('/ano/:year', getPeliculasAno)
router.get('/anios', getAniosUnicos);
router.get('/nombre/:nombre', getMoviesSearch)

module.exports = router;
