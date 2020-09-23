import React from 'react';
import { Alert } from 'react-bootstrap';

export const Notification = ({ notification, reset }) => {
  setTimeout(() => reset(), 3000);
  return (
    <div className="alert">
      <Alert variant={notification.type} onClose={reset} dismissible>
        <p>{notification.message}</p>
      </Alert>
    </div>
  );
};
