const Movie = require('../models/movie');

const initialMovies = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'The Reckoning',
    genre: 'Horror',
    score: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Hell House',
    genre: 'Horror',
    score: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Freddy vs Jason',
    genre: 'Horror',
    score: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'Taken',
    genre: 'Thriller',
    score: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'LoTR',
    genre: 'Fantasy',
    score: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Star Wars',
    genre: 'SciFi',
    score: 2,
    __v: 0,
  },
];

const moviesInDb = async () => {
  const movies = await Movie.find({});
  return movies.map((movie) => movie.toJSON());
};

const nonExistingId = async () => {
  const movie = new Movie({ title: 'lol' });
  await movie.save();
  await movie.remove();

  return movie._id.toString();
};

module.exports = {
  initialMovies,
  moviesInDb,
  nonExistingId,
};
