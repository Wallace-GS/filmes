import React, { useState, useEffect } from 'react';
import './App.css';
import { Movie } from './components/Movie';
import { Notification } from './components/Notification';
import { Forms } from './components/Forms';
import { getAll, createMovie, setToken } from './services/movies';
import { login } from './services/login';
import { register } from './services/register';
import { Menu } from './components/Menu';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: '',
    genre: '',
  });
  const [sortBy, setSortBy] = useState('recent');
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
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
  const handleRegisterVisible = () => setRegisterVisible(!registerVisible);
  const handleFormVisible = () => setFormVisible(!formVisible);

  const handleSort = (sort) => setSortBy(sort);

  const notificationHandler = () =>
    setNotification({ message: '', show: false });

  const handleUsernameChange = ({ target }) => setUsername(target.value);
  const handlePasswordChange = ({ target }) => setPassword(target.value);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ username, password });

      window.localStorage.setItem('loggedFilmesUser', JSON.stringify(user));
      setToken(user.token);
      setSortBy('recent');
      setUser(user);
      setNotification(() => ({
        message: `Welcome, ${username}.`,
        show: true,
        type: 'success',
      }));
      setUsername('');
      setPassword('');
      setLoginVisible(false);
    } catch (e) {
      setNotification(() => ({
        message: 'Invalid username or password.',
        show: true,
        type: 'danger',
      }));
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem('loggedFilmesUser');
    setSortBy('recent');
    setUser(null);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register({ username, password });
      const user = await login({ username, password });

      window.localStorage.setItem('loggedFilmesUser', JSON.stringify(user));
      setToken(user.token);
      setUser(user);
      setNotification(() => ({
        message: `Registration successful. Welcome, ${username}.`,
        show: true,
        type: 'success',
      }));
      setUsername('');
      setPassword('');
      setRegisterVisible(false);
    } catch (e) {
      console.log(e);
      setNotification(() => ({
        message: `Error. Please try another username which meets the requirements.`,
        show: true,
        type: 'danger',
      }));
    }
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
        registerVisible={registerVisible}
        formVisible={formVisible}
        handleSort={handleSort}
        handleLoginVisible={handleLoginVisible}
        handleRegisterVisible={handleRegisterVisible}
        handleFormVisible={handleFormVisible}
        handleLogout={handleLogout}
      />
      {loginVisible && (
        <>
          <h1>Login</h1>
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
        </>
      )}
      {registerVisible && (
        <>
          <h1>Register</h1>
          <p>* Both username and password must be 4 characters or longer.</p>
          <Forms
            valueA={username}
            valueB={password}
            typeA="text"
            typeB="password"
            labelA="Username"
            labelB="Password"
            handleSubmit={handleRegister}
            handleChangeA={handleUsernameChange}
            handleChangeB={handlePasswordChange}
          />
        </>
      )}
      {formVisible && (
        <>
          <h1>Add Movie</h1>
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

      <Movie movies={movies} sortBy={sortBy} user={user} />
    </div>
  );
};

export default App;
