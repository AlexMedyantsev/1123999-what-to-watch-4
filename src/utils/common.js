export const getUniqueArrayElements = (array) => {
  let result = [];

  array.forEach((item) => {
    if (!result.includes(item)) {
      result.push(item);
    }
  });

  return result;
};

export const getMoviesByFilter = (array, filterType) => array.filter((item) => item.genres.find((it) => it === filterType));

export const getSimilarMoviesByGenres = (moviesArray, movie) => {
  const moviesByGenre = [];
  const similarMovies = movie.genres.map((genre) => [].concat(getMoviesByFilter(moviesArray, genre)));
  similarMovies.forEach((movieElement) => movieElement.forEach((it) => moviesByGenre.push(it)));
  const similarMoviesByGenre = moviesByGenre.filter((it) => it !== movie);

  return getUniqueArrayElements(similarMoviesByGenre);
};
