import React, { useState, useEffect } from 'react';
import { Movie } from './components/Movie';
import { getAll } from './services/movies';

const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAll().then((movies) => setMovies(movies));
  }, []);

  return (
    <div>
      <h2>movies</h2>
      {movies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default App;
