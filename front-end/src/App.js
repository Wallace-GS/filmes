import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './App.css';
import { Movie } from './components/Movie';
import { Notification } from './components/Notification';
import { Forms } from './components/Forms';
import { getAll, createMovie, setToken } from './services/movies';
import { login } from './services/login';
import { Menu } from './components/Menu';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: '',
    genre: '',
  });
  const [loginVisible, setLoginVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
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

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedFilmesUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const handleLoginVisible = () => setLoginVisible(!loginVisible);
  const handleFormVisible = () => setFormVisible(!formVisible);

  const notificationHandler = () =>
    setNotification({ title: '', message: '', show: false });

  const handleUsernameChange = ({ target }) => setUsername(target.value);
  const handlePasswordChange = ({ target }) => setPassword(target.value);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ username, password });

      window.localStorage.setItem('loggedFilmesUser', JSON.stringify(user));
      setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (e) {
      setNotification(() => ({
        title: 'Wrong credentials',
        message: 'Invalid username or password.',
        show: true,
        type: 'danger',
      }));
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem('loggedFilmesUser');
    setUser(null);
  };

  const handleNewMovieChange = ({ target }) => {
    setNewMovie({ ...newMovie, [target.name]: target.value });
  };
  const handleAddMovie = async (e) => {
    e.preventDefault();
    await createMovie(newMovie);
    const movies = await getAll();
    setMovies(movies);

    setNotification(() => ({
      title: 'Success',
      message: `Added movie: ${newMovie.title}`,
      show: true,
      type: 'success',
    }));
    setNewMovie({
      title: '',
      genre: '',
    });
  };

  return (
    <div className="content-wrapper">
      <Menu
        user={user}
        loginVisible={loginVisible}
        handleLoginVisible={handleLoginVisible}
        handleFormVisible={handleFormVisible}
      />
      {loginVisible && (
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
      {formVisible && (
        <>
          <p>{user.name} - logged in.</p>
          <Button onClick={handleLogout} variant="outline-danger">
            Logout
          </Button>
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

      {notification.show && (
        <Notification notification={notification} reset={notificationHandler} />
      )}

      <Movie movies={movies} />
    </div>
  );
};

export default App;
