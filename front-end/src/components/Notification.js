import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export const Notification = ({ notification, reset }) => {
  const [show] = useState(notification.show);

  return (
    <>
      <Modal show={show} onHide={reset}>
        <Modal.Header closeButton>
          <Modal.Title>{notification.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{notification.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={reset}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
