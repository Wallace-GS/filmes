const moviesRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectId;
const Movie = require('../models/movie');
const User = require('../models/user');

moviesRouter.get('/', async (request, response) => {
  const movies = await Movie.find({}).populate('user');
  response.json(movies.map((movie) => movie.toJSON()));
});

moviesRouter.get('/:id', async (request, response) => {
  const movie = await Movie.findById(request.params.id);

  if (movie) response.json(movie.toJSON());
  else response.status(404).end();
});

moviesRouter.post('/', async (request, response) => {
  const body = request.body;
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id)
    return response.status(401).json({ error: 'token missing or invalid' });
  const user = await User.findById(body.userId);

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
  const token = request.token;
  const movie = await Movie.findById(request.params.id);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token) return response.status(401).json({ error: 'token missing' });
  else if (decodedToken.id !== movie.user.toString())
    return response.status(401).json({ error: 'unauthorized access.' });

  await Movie.findByIdAndRemove(request.params.id);

  response.status(204).end();
});

moviesRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const token = request.token;
  const movie = await Movie.findById(request.params.id);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token) return response.status(401).json({ error: 'token missing' });
  else if (decodedToken.id !== movie.user.toString())
    return response.status(401).json({ error: 'unauthorized access.' });

  const updatedMovie = {
    score: body.score,
  };
  const updated = await Movie.findByIdAndUpdate(
    request.params.id,
    updatedMovie,
    {
      new: true,
    }
  );
  response.json(updated.toJSON);
});

module.exports = moviesRouter;
