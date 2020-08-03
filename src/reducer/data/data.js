import {extend} from "../../utils/common.js";
import {adaptMovie, adaptMovies} from '../../adapters/movies.js';

const initialState = {
  movies: [],
  promoMovie: null,
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO_MOVIES: `LOAD_PROMO_MOVIES`,
  UPDATE_MOVIE: `UPDATE_MOVIE`,
};

const SERVER_ROUTE = {
  login: `/login`,
  postComment: `/comments/`,
  postFavoriteMovie: `/favorite/`,
};

const ActionCreator = {
  loadMovies: (movies) => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: movies,
    };
  },
  loadPromoMovie: (movie) => {
    return {
      type: ActionType.LOAD_PROMO_MOVIES,
      payload: movie,
    };
  },
  updateMovie: (movie) => {
    return {
      type: ActionType.UPDATE_MOVIE,
      payload: movie,
    };
  }
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((responce) => {
        dispatch(ActionCreator.loadMovies(adaptMovies(responce.data)));
      });
  },
  loadPromoMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((responce) => {
        dispatch(ActionCreator.loadPromoMovie(adaptMovie(responce.data)));
      });
  },
  postFavoriteMovie: (filmId, status) => (dispatch, getState, api) => {
    return api.post(`${SERVER_ROUTE.postFavoriteMovie}${filmId}/${+status}`, {
      "film_id": filmId,
      "status": +status,
    })
      .then((response) => {
        dispatch(ActionCreator.updateMovie(...adaptMovies([response.data])));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {movies: action.payload});
    case ActionType.LOAD_PROMO_MOVIES:
      return extend(state, {promoMovie: action.payload});
    case ActionType.UPDATE_MOVIE:
      return extend(state, {
        movies: state.movies.map((movie) => {
          if (movie.id === action.payload.id) {
            return action.payload;
          }
          return movie;
        })
      });
  }
  return state;
};

export {reducer, ActionCreator, ActionType, Operation};
