const moviesRouter = require('express').Router();
const Movie = require('../models/movie');

moviesRouter.get('/', async (_, res) => {
  const movies = await Movie.find({});
  res.json(movies);
});

moviesRouter.post('/', async (req, res, next) => {
  const body = req.body;

  const movie = new Movie({
    title: body.title,
    url: body.url,
    likes: body.likes || 0,
  });

  try {
    const result = await movie.save();
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
});

moviesRouter.delete('/:id', async (req, res, next) => {
  try {
    await Movie.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

moviesRouter.put('/:id', async (req, res, next) => {
  const body = req.body;

  const movie = {
    likes: body.likes,
  };
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, movie, {
      new: true,
    });
    res.json(updatedMovie);
  } catch (e) {
    next(e);
  }
});

module.exports = moviesRouter;
