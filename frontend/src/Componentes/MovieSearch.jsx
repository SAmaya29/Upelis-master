import React, { useState } from 'react';

const MovieSearch = ({ setFiltroNombre }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        setFiltroNombre(query); // Pasar el nombre a HomePage
    };

    return (
        <div className="search-bar">
        <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default MovieSearch;
