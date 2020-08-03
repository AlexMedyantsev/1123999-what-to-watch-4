import NameSpace from './../name-space.js';

import {GENRES, MAX_NUMBER_GENRES} from "../../utils/consts.js";

export const getMoviesByGenre = (state) => {
  if (state[NameSpace.CONDITION].currentGenre === GENRES.ALL) {
    return state[NameSpace.DATA].movies;
  } else {
    return state[NameSpace.DATA].movies.filter((movie) => {
      return movie.genre === state[NameSpace.CONDITION].currentGenre;
    });
  }
};

export const getUniqueGenres = (state) => {
  const genres = new Set();
  genres.add(`All genres`);

  state.DATA.movies.forEach((movie) => {
    genres.add(movie.genre);
  });

  return Array.from(genres).slice(0, MAX_NUMBER_GENRES);
};

export const getShowedMoviesCount = (state) => state[NameSpace.CONDITION].countMoviesShowed;

export const getActiveMovie = (state) => state[NameSpace.CONDITION].activeMovie;


