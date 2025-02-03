
import React from 'react';
import MovieCard from './MovieCard'

const MovieGallery = ({ peliculas }) => {
  return (
    <div className="movie-gallery">
      {peliculas.map(pelicula => (
        <MovieCard key={pelicula.id} pelicula={pelicula} />
      ))}
    </div>
  );
};

export default MovieGallery;


