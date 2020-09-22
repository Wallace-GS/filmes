const Movie = require('../models/movie');

const initialMovies = [
  {
    title: 'Spiderman',
    url: 'spidey.com',
    likes: 10,
    id: '5f68a7fe426d8344300560cc',
  },
  {
    title: 'Batman',
    url: 'Batty.com',
    likes: 8,
    id: '5f68b0d8cefe0a32f01fb239',
  },
];

const nonExistingId = async () => {
  const movie = new Movie({ title: 'willremovethissoon', url: 'temp.com' });
  await movie.save();
  await movie.remove();

  return movie._id.toString();
};

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
  nonExistingId,
  moviesInDb,
  usersInDb,
};
