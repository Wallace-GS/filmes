import React from 'react';
import Table from 'react-bootstrap/table';

export const Movie = ({ movies, sortBy, user }) => {
  let listMovies = [];
  let temp = [];

  if (sortBy === 'likes') {
    movies.sort((a, b) => b.likes - a.likes);
    listMovies = movies.map((movie) => (
      <tr key={movie.id}>
        <td>{movie.title}</td>
        <td>{movie.genre}</td>
        <td>{movie.user.username}</td>
        <td>{new Date(movie.date).toLocaleDateString()}</td>
        {/* <td>{movie.likes}</td> */}
      </tr>
    ));
  } else if (sortBy === 'user' && user) {
    temp = movies.filter((movie) => movie.user.username === user.username);
    listMovies = temp.map((movie) => (
      <tr key={movie.id}>
        <td>{movie.title}</td>
        <td>{movie.genre}</td>
        <td>{movie.user.username}</td>
        <td>{new Date(movie.date).toLocaleDateString()}</td>
        {/* <td>{movie.likes}</td> */}
      </tr>
    ));
    console.log(listMovies);
  } else if (sortBy === 'recent') {
    movies.sort((a, b) => new Date(b.date) - new Date(a.date));
    listMovies = movies.map((movie) => (
      <tr key={movie.id}>
        <td>{movie.title}</td>
        <td>{movie.genre}</td>
        <td>{movie.user.username}</td>
        <td>{new Date(movie.date).toLocaleDateString()}</td>
        {/* <td>{movie.likes}</td> */}
      </tr>
    ));
  }

  return (
    <div className="movie-table text-align">
      <Table responsive="sm" striped bordered variant="dark">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Added By</th>
            <th>Date Added</th>
            {/* <th>Likes</th> */}
          </tr>
        </thead>
        <tbody>{listMovies}</tbody>
      </Table>
    </div>
  );
};
