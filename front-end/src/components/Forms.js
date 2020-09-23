import React from 'react';
import { Form, Button } from 'react-bootstrap';

export const Forms = ({
  valueA,
  valueB,
  typeA,
  typeB,
  labelA,
  labelB,
  handleChangeA,
  handleChangeB,
  handleSubmit,
}) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group>
      <Form.Label>{labelA}</Form.Label>
      <Form.Control
        name={labelA.toLowerCase()}
        type={typeA}
        value={valueA}
        onChange={handleChangeA}
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>{labelB}</Form.Label>
      <Form.Control
        name={labelB.toLowerCase()}
        type={typeB}
        value={valueB}
        onChange={handleChangeB}
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
