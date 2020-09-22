const moviesRouter = require('express').Router();
const Movie = require('../models/movie');
const User = require('../models/user');

moviesRouter.get('/', async (_, res) => {
  const movies = await Movie.find({}).populate('user', {
    username: 1,
    name: 1,
  });
  res.json(movies);
});

moviesRouter.post('/', async (req, res, next) => {
  const body = req.body;

  user = await User.findById(body.userId);

  const movie = new Movie({
    title: body.title,
    url: body.url,
    genre: body.genre,
    likes: body.likes || 0,
    date: new Date(),
    user: user._id,
  });

  const savedMovie = await movie.save();
  user.movies = user.movies.concat(savedMovie._id);
  await user.save();
  res.status(201).json(savedMovie);
});

moviesRouter.delete('/:id', async (req, res, next) => {
  await Movie.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

moviesRouter.put('/:id', async (req, res, next) => {
  const body = req.body;

  const movie = {
    likes: body.likes,
  };

  const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, movie, {
    new: true,
  });
  res.json(updatedMovie);
});

module.exports = moviesRouter;
