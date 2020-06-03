const moviesRouter = require('express').Router();
const Movie = require('../models/movie');
const User = require('../models/user');

moviesRouter.get('/', async (request, response) => {
  const movies = await Movie.find({});
  response.json(movies.map((movie) => movie.toJSON()));
});

moviesRouter.get('/:id', async (request, response) => {
  const movie = await Movie.findById(request.params.id);

  if (movie) response.json(movie.toJSON());
  else response.status(404).end();
});

moviesRouter.post('/', async (request, response) => {
  const body = request.body;
  const user = await User.findById(request.body.userId);

  const movie = new Movie({
    title: body.title,
    genre: body.genre,
    score: body.score,
    user: user._id,
  });

  const saved = await movie.save();
  user.movies = user.movies.concat(saved._id);
  await user.save();

  response.json(saved.toJSON);
});

moviesRouter.delete('/:id', async (request, response) => {
  await Movie.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

moviesRouter.put('/:id', async (request, response) => {
  const movie = request.body;

  const updated = await Movie.findByIdAndUpdate(request.params.id, movie, {
    new: true,
  });
  response.json(updated.toJSON);
});

module.exports = moviesRouter;
