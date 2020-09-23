import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

import './App.css';
import { Movie } from './components/Movie';
import { Notification } from './components/Notification';
import { getAll } from './services/movies';
import { login } from './services/login';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [notification, setNotification] = useState({
    title: '',
    message: '',
    show: false,
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

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
      console.log('success');
    } catch (e) {
      setNotification((notification) => ({
        title: 'Wrong credentials',
        message: 'Invalid username or password.',
        show: true,
      }));
    }
  };

  return (
    <div className="content-wrapper">
      <h2>Movies</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formGroupUser">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            placeholder="Enter username"
          />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <Button
          variant="outline-light"
          type="submit"
          onMouseDown={(e) => e.preventDefault()}
        >
          Submit
        </Button>
      </Form>
      <Movie movies={movies} />
      {notification.show && (
        <Notification notification={notification} reset={notificationHandler} />
      )}
    </div>
  );
};

export default App;
