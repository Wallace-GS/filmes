import React from 'react';
import Table from 'react-bootstrap/table';

export const Movie = ({ movies }) => {
  const dummyList = [
    {
      title: 'Suicide Squad',
      url: 'emo.sad',
      genre: 'Action/Adventure',
      likes: -110,
      date: '2020-09-23T01:46:58.494Z',
      user: {
        username: 'moviefan1',
        name: 'Movie Fan',
        id: '5f6a1a14bbc6bf0b4060aa62',
      },
      id: '5f6aa9126b16503bd84c31e',
    },
    {
      title: 'Batman',
      url: 'batty.com',
      genre: 'Action/Adventure',
      likes: 10,
      date: '2020-09-23T01:46:58.494Z',
      user: {
        username: 'moviefan1',
        name: 'Movie Fan',
        id: '5f6a1a14bbc6bf0b4060aa62',
      },
      id: '5f6aa9126b16503bd84c31',
    },
    {
      title: 'Antman',
      url: 'smol.com',
      genre: 'Action/Adventure',
      likes: -10,
      date: '2020-09-23T01:46:58.494Z',
      user: {
        username: 'moviefan1',
        name: 'Movie Fan',
        id: '5f6a1a14bbc6bf0b4060aa62',
      },
      id: '5f6aa9126b16503bd84c3',
    },
    {
      title: 'Spiderman',
      url: 'spidey.web',
      genre: 'Action/Adventure',
      likes: 13,
      date: '2020-09-23T01:46:58.494Z',
      user: {
        username: 'moviefan1',
        name: 'Movie Fan',
        id: '5f6a1a14bbc6bf0b4060aa62',
      },
      id: '5f6aa9126b16503bd84c',
    },
    {
      title: 'Ironman',
      url: 'ego.bad',
      genre: 'Action/Adventure',
      likes: 30,
      date: '2020-09-23T01:46:58.494Z',
      user: {
        username: 'moviefan1',
        name: 'Movie Fan',
        id: '5f6a1a14bbc6bf0b4060aa62',
      },
      id: '5f6aa9126b16503bd84',
    },
    {
      title: 'Thor',
      url: 'strong.me',
      genre: 'Action/Adventure',
      likes: 143,
      date: '2020-09-23T01:46:58.494Z',
      user: {
        username: 'moviefan1',
        name: 'Movie Fan',
        id: '5f6a1a14bbc6bf0b4060aa62',
      },
      id: '5f6aa9126b165',
    },
    {
      title: 'Catwoman',
      url: 'meow.kitty',
      genre: 'Action/Adventure',
      likes: -110,
      date: '2020-09-23T01:46:58.494Z',
      user: {
        username: 'moviefan1',
        name: 'Movie Fan',
        id: '5f6a1a14bbc6bf0b4060aa62',
      },
      id: '5f6aa9126b16503bd8',
    },
    {
      title: 'Superman',
      url: 'laser.eyes',
      genre: 'Action/Adventure',
      likes: -110,
      date: '2020-09-23T01:46:58.494Z',
      user: {
        username: 'moviefan1',
        name: 'Movie Fan',
        id: '5f6a1a14bbc6bf0b4060aa62',
      },
      id: '5f6aa9126b16503bd',
    },
    {
      title: 'Xmen',
      url: 'mutate.string',
      genre: 'Action/Adventure',
      likes: -110,
      date: '2020-09-23T01:46:58.494Z',
      user: {
        username: 'moviefan1',
        name: 'Movie Fan',
        id: '5f6a1a14bbc6bf0b4060aa62',
      },
      id: '5f6aa9126b16503',
    },
  ];
  const listMovies = dummyList.map((movie) => (
    <tr key={movie.id}>
      <td>{movie.title}</td>
      <td>{movie.genre}</td>
      <td>{movie.user.username}</td>
      <td>{new Date(movie.date).toLocaleDateString()}</td>
      <td>{movie.likes}</td>
    </tr>
  ));

  return (
    <div className="movie-table text-align">
      <Table striped bordered variant="dark">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Added By</th>
            <th>Date Added</th>
            <th>Likes</th>
          </tr>
        </thead>
        <tbody>{listMovies}</tbody>
      </Table>
    </div>
  );
};
