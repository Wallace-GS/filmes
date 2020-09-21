const listHelper = require('../utils/list_helper');
const noMovies = [];
const oneMovie = [
  {
    _id: '5f68a7fe426d8344300560cc',
    title: 'Spiderman',
    url: 'spidey.com',
    likes: 10,
    __v: 0,
  },
];
const severalMovies = [
  {
    title: 'Spiderman',
    url: 'spidey.com',
    likes: 10,
    id: '5f68a7fe426d8344300560cc',
  },
  {
    title: 'Batman',
    url: 'Batty.com',
    likes: 9,
    id: '5f68b0d8cefe0a32f01fb239',
  },
  {
    title: 'Ironman',
    url: 'douche.com',
    likes: 0,
    id: '5f68c066fbe5633258e0ceac',
  },
  {
    title: 'Catwoman',
    url: 'kitty.com',
    likes: 3,
    id: '5f68c088fbe5633258e0cead',
  },
];

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(noMovies);
    expect(result).toBe(0);
  });

  test('of list with one movie equals the likes of that movie', () => {
    const result = listHelper.totalLikes(oneMovie);
    expect(result).toBe(10);
  });

  test('of a bigger list is calculated correctly', () => {
    const result = listHelper.totalLikes(severalMovies);
    expect(result).toBe(22);
  });
});

describe('most likes', () => {
  test('of empty list is no movie', () => {
    const result = listHelper.topMovie(noMovies);
    expect(result).toEqual(undefined);
  });

  test('of list with one movie equals the that movie', () => {
    const result = listHelper.topMovie(oneMovie);
    expect(result).toEqual(oneMovie[0]);
  });

  test('of a bigger list is calculated correctly', () => {
    const result = listHelper.topMovie(severalMovies);
    expect(result).toEqual(severalMovies[0]);
  });
});
