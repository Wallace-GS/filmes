const moviesRouter = require('express').Router();
const Movie = require('../models/movie');

moviesRouter.get('/', (_, res) => {
  Movie.find({}).then((movies) => {
    res.json(movies);
  });
});

moviesRouter.post('/', (req, res) => {
  const movie = new Movie(req.body);

  movie.save().then((result) => {
    res.status(201).json(result);
  });
});

module.exports = moviesRouter;
