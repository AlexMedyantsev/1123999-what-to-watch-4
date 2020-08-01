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

export const getSimilarMoviesByGenres = (moviesArray, openedMovie) => {
  const moviesByGenre = [];
  if (moviesArray && openedMovie) {
    const currentMovieGenre = openedMovie.genre;
    moviesArray.forEach((movie) => (movie.genre === currentMovieGenre ? moviesByGenre.push(movie) : ``));
  }

  return moviesByGenre;
};

import {GENRES, MAX_NUMBER_GENRES} from "./consts.js";

export const getMoviesByGenre = (state) => {
  return state.DATA.movies.filter((movie) => {
    if (state.DATA.currentGenre === GENRES.ALL) {
      return true;
    }
    return movie.genre.includes(state.currentGenre);
  });
};

export const getUniqueGenres = (state) => {
  const genres = new Set();
  genres.add(`All genres`);

  state.DATA.movies.forEach((movie) => {
    genres.add(movie.genre);
  });

  return Array.from(genres).slice(0, MAX_NUMBER_GENRES);
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};
