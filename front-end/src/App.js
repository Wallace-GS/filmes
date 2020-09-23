import React, { useState, useEffect } from 'react';
import './App.css';
import { Movie } from './components/Movie';
import { Notification } from './components/Notification';
import { Forms } from './components/Forms';
import { getAll, createMovie, setToken } from './services/movies';
import { login } from './services/login';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: '',
    genre: '',
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    title: '',
    message: '',
    show: false,
  });

  useEffect(() => {
    getAll().then((movies) => setMovies(movies));
  }, []);

  const notificationHandler = () =>
    setNotification({ title: '', message: '', show: false });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ username, password });

      setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setNotification(() => ({
        title: 'Success',
        message: `Welcome, ${user.name}.`,
        show: true,
      }));
    } catch (e) {
      setNotification(() => ({
        title: 'Wrong credentials',
        message: 'Invalid username or password.',
        show: true,
      }));
    }
  };
  const handleUsernameChange = ({ target }) => setUsername(target.value);
  const handlePasswordChange = ({ target }) => setPassword(target.value);

  const handleNewMovieChange = ({ target }) => {
    setNewMovie({ ...newMovie, [target.name]: target.value });
  };
  const handleAddMovie = async (e) => {
    e.preventDefault();
    const returnedMovie = await createMovie(newMovie);
    setTimeout(() => setMovies(movies.concat(returnedMovie)), 3000);

    setNewMovie({
      title: '',
      genre: '',
    });
  };

  return (
    <div className="content-wrapper">
      <h1>Movies</h1>
      {user === null && (
        <Forms
          valueA={username}
          valueB={password}
          typeA="text"
          typeB="password"
          labelA="Username"
          labelB="Password"
          handleSubmit={handleLogin}
          handleChangeA={handleUsernameChange}
          handleChangeB={handlePasswordChange}
        />
      )}
      {user !== null && (
        <>
          <p>{user.name} - logged in.</p>
          <Forms
            valueA={newMovie.title}
            valueB={newMovie.genre}
            typeA="text"
            typeB="text"
            labelA="Title"
            labelB="Genre"
            handleSubmit={handleAddMovie}
            handleChangeA={handleNewMovieChange}
            handleChangeB={handleNewMovieChange}
          />
        </>
      )}
      <Movie movies={movies} />
      {notification.show && (
        <Notification notification={notification} reset={notificationHandler} />
      )}
    </div>
  );
};

export default App;
