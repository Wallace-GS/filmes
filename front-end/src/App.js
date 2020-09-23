import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

import './App.css';
import { Movie } from './components/Movie';
import { Notification } from './components/Notification';
import { Login } from './components/Login';
import { getAll } from './services/movies';
import { login } from './services/login';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState('');
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

  const handleAddMovie = () => {
    console.log('adding movie');
  };

  const handleUsernameChange = ({ target }) => setUsername(target.value);
  const handlePasswordChange = ({ target }) => setPassword(target.value);

  const movieForm = () => (
    <Form onSubmit={handleAddMovie}>
      <Form.Group>
        <Form.Label>Add To Backlog</Form.Label>
        <Form.Control
          value={newMovie}
          onChange={({ target }) => setNewMovie(target.value)}
        />
      </Form.Group>
      <Button
        variant="outline-light"
        type="submit"
        onMouseDown={(e) => e.preventDefault()}
      >
        Add
      </Button>
    </Form>
  );

  return (
    <div className="content-wrapper">
      <h1>Movies</h1>
      {user === null && (
        <Login
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
        />
      )}
      {user !== null && (
        <div>
          <p>{user.name} - logged in.</p>
          {movieForm()}
        </div>
      )}
      <Movie movies={movies} />
      {notification.show && (
        <Notification notification={notification} reset={notificationHandler} />
      )}
    </div>
  );
};

export default App;
