const moviesRouter = require('express').Router();
const Movie = require('../models/movie');

moviesRouter.get('/', (_, res) => {
  Movie.find({}).then((movies) => {
    res.json(movies);
  });
});

moviesRouter.post('/', (req, res) => {
  const body = req.body;
  const movie = new Movie({
    title: body.title,
    url: body.url,
    likes: body.likes || 0,
  });

  movie.save().then((result) => {
    res.status(201).json(result);
  });
});

module.exports = moviesRouter;
