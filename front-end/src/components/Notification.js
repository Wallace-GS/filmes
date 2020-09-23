import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export const Notification = ({ notification, reset }) => {
  const [show, setShow] = useState(notification.show);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={reset}>
        <Modal.Header closeButton>
          <Modal.Title>Invalid Credentials</Modal.Title>
        </Modal.Header>
        <Modal.Body>Wrong username or password.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={reset}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
