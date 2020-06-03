const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const Movie = require('../models/movie');

const api = supertest(app);

beforeEach(async () => {
  await Movie.deleteMany({});

  for (const movie of helper.initialMovies) {
    const movieObj = new Movie(movie);
    await movieObj.save();
  }
});

describe('when there exists movies in the database', () => {
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

  test('a specific movie is within database', async () => {
    const res = await api.get('/api/movies');
    const contents = res.body.map((m) => m.title);
    expect(contents).toContain('Taken');
  });

  test('unique identifier property of the movie is named id', async () => {
    const res = await api.get('/api/movies');
    res.body.forEach((movie) => expect(movie.id).toBeDefined());
  });
});

describe('when specific movies must be pulled up', () => {
  test('succeeds with valid id', async () => {
    const movies = await helper.moviesInDb();
    const movieToView = movies[0];

    const result = await api
      .get(`/api/movies/${movieToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(result.body).toEqual(movieToView);
  });

  test('fails with 404 if movie is not within database', async () => {
    const validId = await helper.nonExistingId();

    await api.get(`/api/movies/${validId}`).expect(404);
  });

  test('fails with 400 if requested movie id is malformatted', async () => {
    const invalidId = '5';

    await api.get(`/api/movies/${invalidId}`).expect(400);
  });
});

describe('when movies are being added', () => {
  test('a valid movie can be added', async () => {
    const newMovie = {
      title: 'foo',
      genre: 'bar',
      score: 1,
    };

    await api
      .post('/api/movies')
      .send(newMovie)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const moviesAtEnd = await helper.moviesInDb();
    expect(moviesAtEnd).toHaveLength(helper.initialMovies.length + 1);
  });

  test('an invalid movie is not added and returns 400', async () => {
    const newMovie = {
      genre: 'action',
      score: 1,
    };

    await api.post('/api/movies').send(newMovie).expect(400);

    const moviesAtEnd = await helper.moviesInDb();
    expect(moviesAtEnd).toHaveLength(helper.initialMovies.length);
  });
});

describe('when movies are deleted', () => {
  test('movies which are deleted succesfully returns 204', async () => {
    const movies = await helper.moviesInDb();
    const movieToDelete = movies[0];

    await api.delete(`/api/movies/${movieToDelete.id}`).expect(204);

    const moviesAtEnd = await helper.moviesInDb();
    expect(moviesAtEnd).toHaveLength(helper.initialMovies.length - 1);
  });
});

describe('when movies are updated', () => {
  test('movies which are updated succesfully returns 200', async () => {
    const movies = await helper.moviesInDb();
    const movieToUpdate = movies[0];
    movieToUpdate.title = 'Wars Stars';

    await api.put(`/api/movies/${movieToUpdate.id}`).expect(200);

    const moviesAtEnd = await helper.moviesInDb();
    expect(moviesAtEnd).toHaveLength(helper.initialMovies.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
