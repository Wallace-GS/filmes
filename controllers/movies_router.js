const moviesRouter = require('express').Router();
const Movie = require('../models/movie');

moviesRouter.get('/', async (request, response) => {
  const movies = await Movie.find({});
  response.json(movies.map((movie) => movie.toJSON()));
});

moviesRouter.post('/', async (request, response) => {
  const movie = new Movie(request.body);

  const saved = await movie.save();
  response.json(saved.toJSON);
});

moviesRouter.delete('/:id', async (request, response) => {
  await Movie.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

moviesRouter.put('/:id', async (request, response) => {
  const blog = request.body;

  const updated = await Movie.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updated.toJSON);
});

module.exports = moviesRouter;
