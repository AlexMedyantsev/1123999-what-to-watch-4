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

import {GENRES, MAX_NUMBER_GENRES} from "./consts.js";

export const getMoviesByGenre = (state) => {
  return state.movies.filter((movie) => {
    if (state.currentGenre === GENRES.ALL) {
      return true;
    }
    return movie.genres.includes(state.currentGenre);
  });
};

export const getUniqueGenres = (state) => {
  const genres = new Set();
  genres.add(`All genres`);

  state.movies.forEach((movie) => {
    movie.genres.forEach((genre) => genres.add(genre));
  });

  return Array.from(genres).slice(0, MAX_NUMBER_GENRES);
};


