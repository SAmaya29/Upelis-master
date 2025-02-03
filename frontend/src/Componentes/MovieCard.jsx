import React from 'react';

const MovieCard = ({ pelicula }) => {
  const baseUrl = 'https://image.tmdb.org/t/p/w500'; // Base URL de TMDB con el tamaño de la imagen
  const posterUrl = `${baseUrl}${pelicula.caratula}`; // Combina la base URL con el path que tienes almacenado

  return (
    <div className="movie-card">
      <img src={posterUrl} alt={pelicula.titulo} />
      <div className="movie-info">
        <h3>{pelicula.titulo}</h3>
        <p>{pelicula.year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
