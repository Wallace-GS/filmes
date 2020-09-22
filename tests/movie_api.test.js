const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Movie = require('../models/movie');

beforeEach(async () => {
  await Movie.deleteMany({});

  let movieObject = new Movie(helper.initialMovies[0]);
  await movieObject.save();

  movieObject = new Movie(helper.initialMovies[1]);
  await movieObject.save();
});

describe('when there is initially some movies in DB', () => {
  test('movies are returned as json', async () => {
    await api
      .get('/api/movies')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all movies are returned', async () => {
    const res = await api.get('/api/movies');

    expect(res.body).toHaveLength(helper.initialMovies.length);
  });

  test('a specific movie is within the returned movies', async () => {
    const res = await api.get('/api/movies');

    const titles = res.body.map((movie) => movie.title);

    expect(titles).toContain('Spiderman');
  });
});

describe('when a movie is being added', () => {
  test('a valid movie can be added', async () => {
    const newMovie = {
      title: 'Daredevil',
      url: 'dare.com',
      likes: 4,
    };

    await api
      .post('/api/movies')
      .send(newMovie)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const moviesAtEnd = await helper.moviesInDb();
    expect(moviesAtEnd).toHaveLength(helper.initialMovies.length + 1);

    const titles = moviesAtEnd.map((movie) => movie.title);
    expect(titles).toContain('Daredevil');
  });

  test('movie without title is not added', async () => {
    const newMovie = {
      url: 'antman.com',
      likes: 2,
    };

    await api.post('/api/movies').send(newMovie).expect(400);

    const moviesAtEnd = await helper.moviesInDb();
    expect(moviesAtEnd).toHaveLength(helper.initialMovies.length);
  });

  test('movie without url is not added', async () => {
    const newMovie = {
      title: 'Antman',
      likes: 2,
    };

    await api.post('/api/movies').send(newMovie).expect(400);

    const moviesAtEnd = await helper.moviesInDb();
    expect(moviesAtEnd).toHaveLength(helper.initialMovies.length);
  });

  test('movie added without likes property defaults to 0 likes', async () => {
    const newMovie = {
      title: 'Robin',
      url: 'sidekick.com',
    };

    await api.post('/api/movies').send(newMovie).expect(201);

    const moviesAtEnd = await helper.moviesInDb();
    expect(moviesAtEnd[moviesAtEnd.length - 1].likes).toBe(0);
  });
});

describe('deletion of a movie', () => {
  test('movie with valid id is properly removed with status 204', async () => {
    const moviesAtStart = await helper.moviesInDb();
    const movieToDelete = moviesAtStart[0];

    await api.delete(`/api/movies/${movieToDelete.id}`).expect(204);

    const moviesAtEnd = await helper.moviesInDb();

    expect(moviesAtEnd).toHaveLength(moviesAtStart.length - 1);
  });
});

describe('updating likes of a movie', () => {
  test('movie with valid id is properly updated', async () => {
    const moviesAtStart = await helper.moviesInDb();
    const movieToUpdate = moviesAtStart[0];
    movieToUpdate.likes = 11;

    await api.put(`/api/movies/${movieToUpdate.id}`).send(movieToUpdate);

    const moviesAtEnd = await helper.moviesInDb();

    expect(moviesAtEnd[0].likes).toBe(11);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
