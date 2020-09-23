import React, { useState, useEffect } from 'react';
import { Movie } from './components/Movie';
import { getAll } from './services/movies';
import Button from 'react-bootstrap/Button';

const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAll().then((movies) => setMovies(movies));
  }, []);

  return (
    <div>
      <h2>movies</h2>
      <Movie movies={movies} />
    </div>
  );
};

export default App;
