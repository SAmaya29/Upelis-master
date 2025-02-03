import React, { useState, useEffect } from 'react';

const Sidebar = ({ setFiltroGenero, setFiltroAno }) => {
  const [generos, setGeneros] = useState([]);
  const [anios, setAnios] = useState([]);

  useEffect(() => {
    const fetchGeneros = async () => {
      const res = await fetch('http://localhost:5000/api/peliculas/generos');
      const data = await res.json();
      setGeneros(data);
    };

    const fetchAnios = async () => {
      const res = await fetch('http://localhost:5000/api/peliculas/anios');
      const data = await res.json();
      setAnios(data);  // Almacenar los años obtenidos de la base de datos
    };

    fetchGeneros();
    fetchAnios();
  }, []);
  
  //Nuevo Codigo
  const handleGeneroClick = (generoId) => {
    setFiltroGenero(generoId);
    setFiltroAno(null); // Reinicia el filtro de año al seleccionar género
  };

  const handleAnoClick = (ano) => {
    setFiltroAno(ano);
    setFiltroGenero(null); // Reinicia el filtro de género al seleccionar año
  };
  //Termina


  return (
    <div className="sidebar">
      <h2>GENRES</h2>
      <ul>
        {generos.map(genero => (
          <li key={genero.id} onClick={() => handleGeneroClick(genero.id)}>{genero.nombre}</li> 
        ))}
      </ul>
      <h2>RELEASE YEAR</h2>
      <div className="years-container">
        {anios.map(ano => (
          <div key={ano} onClick={() => handleAnoClick(ano)} className="year-item">{ano}</div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

