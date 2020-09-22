const totalLikes = (movies) => movies.reduce((acc, cur) => acc + cur.likes, 0);

const topMovie = (movies) => {
  const maxLikes = Math.max(...movies.map((n) => n.likes));
  return movies.find((movie) => movie.likes === maxLikes);
};

module.exports = {
  totalLikes,
  topMovie,
};
