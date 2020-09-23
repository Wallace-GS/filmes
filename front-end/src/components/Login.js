import React from 'react';
import { Form, Button } from 'react-bootstrap';

export const Login = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
}) => (
  <Form onSubmit={handleLogin}>
    <Form.Group>
      <Form.Label>Username</Form.Label>
      <Form.Control
        type="text"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Enter username"
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        value={password}
        onChange={handlePasswordChange}
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
);
