import React from 'react';
import Table from 'react-bootstrap/table';

export const Movie = ({ movies }) => {
  const listMovies = movies.map((movie) => (
    <tr key={movie.id}>
      <td>{movie.title}</td>
      <td>{movie.genre}</td>
      <td>{new Date(movie.date).toDateString()}</td>
      <td>{movie.likes}</td>
    </tr>
  ));

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Date Added</th>
          <th>Likes</th>
        </tr>
      </thead>
      <tbody>{listMovies}</tbody>
    </Table>
  );
};
