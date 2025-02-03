import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MovieGallery from './MovieGallery';
import MovieSearch from './MovieSearch';
import { loginWithGoogle, logout, auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import '../App.css';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [peliculas, setPeliculas] = useState([]);
  const [filtroGenero, setFiltroGenero] = useState(null);
  const [filtroAno, setFiltroAno] = useState(null);
  const [filtroNombre, setFiltroNombre] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [peliculasPorPagina] = useState(25);

  //nuevo
  const handleLogin = async () => {
    const loggedUser = await loginWithGoogle(); // Asegúrate de esperar la respuesta de la promesa
    if (loggedUser) {
      setUser(loggedUser);
    }
  };
  //

  useEffect(() => {
    // Escuchar cambios en la autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        let url = 'http://localhost:5000/api/peliculas';
  
        if (filtroGenero) {
          url = `http://localhost:5000/api/peliculas/genero/${filtroGenero}`;
        } else if (filtroAno) {
          url = `http://localhost:5000/api/peliculas/ano/${filtroAno}`;
        } else if (filtroNombre) {
          url = `http://localhost:5000/api/peliculas/nombre/${filtroNombre}`;
        }
  
        const res = await fetch(url);
        if (!res.ok) throw new Error('Error al obtener los datos');
  
        const data = await res.json();
        setPeliculas(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error al obtener películas:', error);
        setPeliculas([]);
      }
    };

    fetchPeliculas();
  }, [filtroGenero, filtroAno, filtroNombre]);

  // Paginación
  const indiceUltimaPelicula = paginaActual * peliculasPorPagina;
  const indicePrimeraPelicula = indiceUltimaPelicula - peliculasPorPagina;
  const peliculasActuales = (Array.isArray(peliculas) ? peliculas : []).slice(indicePrimeraPelicula, indiceUltimaPelicula);

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const totalPaginas = Math.ceil(peliculas.length / peliculasPorPagina);

  return (
    <div className="homepage">
      <Navbar />
      <div className="content">
        <Sidebar setFiltroGenero={setFiltroGenero} setFiltroAno={setFiltroAno} />
        <div className="movie-section">
          <MovieSearch setFiltroNombre={setFiltroNombre} />
          <h2>{filtroGenero ? "Movies By Genre" : filtroAno ? 'Movies Per Year' : filtroNombre ? `Results for "${filtroNombre}"` : 'ALL MOVIES'}</h2>
          
          {/* Botón de login/logout */}
          <div className="auth-buttons">
            {user ? (
              <>
                <p>Bienvenido, {user.displayName}</p>
                <button onClick={logout}>Cerrar sesión</button>
              </>
            ) : (
              <button onClick={loginWithGoogle}>Iniciar sesión con Google</button>
            )}
          </div>

          <MovieGallery peliculas={peliculasActuales} />
          
          <div className="pagination">
            <button onClick={() => cambiarPagina(1)} disabled={paginaActual === 1}>First</button>
            <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>Previous</button>
            <span>Page {paginaActual} of {totalPaginas}</span>
            <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>Following</button>
            <button onClick={() => cambiarPagina(totalPaginas)} disabled={paginaActual === totalPaginas}>Last</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
