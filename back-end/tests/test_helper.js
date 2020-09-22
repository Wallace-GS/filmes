const Movie = require('../models/movie');
const User = require('../models/user');

const dummyUser = new User({
  username: 'moviefan1',
  name: 'Movie Fan',
  password: 'password',
});

const initialMovies = [
  {
    title: 'Spiderman',
    url: 'spidey.com',
    genre: 'genre',
    likes: 10,
    user: dummyUser,
    id: '5f68a7fe426d8344300560cc',
  },
  {
    title: 'Batman',
    url: 'Batty.com',
    genre: 'genre',
    likes: 8,
    user: dummyUser,
    id: '5f68b0d8cefe0a32f01fb239',
  },
];

const moviesInDb = async () => {
  const movies = await Movie.find({});
  return movies.map((movie) => movie.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialMovies,
  moviesInDb,
  usersInDb,
};
