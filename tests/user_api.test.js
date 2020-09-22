const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('sekret', 10);
  const user = new User({ username: 'root', passwordHash, name: 'root' });

  await user.save();
});

describe('when there is initially one user in db', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails with proper statuscode and message if username too short', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'ro',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('is shorter than the minimum allowed');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails with proper statuscode and message if password is missing', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root1',
      name: 'Superuser',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body).toContain('password is required');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails with proper statuscode and message if password is too short', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root1',
      name: 'Superuser',
      password: 're',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body).toContain('at least 4 digits');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails with proper statuscode and message if name is missing', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root1',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`name` is required');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
