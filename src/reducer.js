import {GENRES, SHOWING_MOVIES_COUNT_ON_START, MOVIES_ADDED_ON_BUTTON_CLICK} from "./utils/consts.js";

export const initialState = {
  currentGenre: GENRES.ALL,
  movies: [],
  countMoviesShow: SHOWING_MOVIES_COUNT_ON_START,
};

export const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SET_MOVIES: `SET_MOVIES`,
  INCREMENT_COUNT_MOVIES_SHOW: `INCREMENT_COUNT_MOVIES_SHOW`,
  RESET_COUNT_MOVIES_SHOW: `RESET_COUNT_MOVIES_SHOW`
};

export const ActionCreator = {
  setCurrentGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
  setMovies: (movies) => ({
    type: ActionType.SET_MOVIES,
    payload: movies,
  }),
  incrementCountMoviesShow: () => ({
    type: ActionType.INCREMENT_COUNT_MOVIES_SHOW,
  }),
  resetCountMoviesShow: () => ({
    type: ActionType.RESET_COUNT_MOVIES_SHOW,
  }),
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return Object.assign({}, state, {
        currentGenre: action.payload,
      });
    case ActionType.SET_MOVIES:
      return Object.assign({}, state, {
        movies: action.payload
      });
    case ActionType.INCREMENT_COUNT_MOVIES_SHOW:
      return Object.assign({}, state, {
        countMoviesShow: state.countMoviesShow + MOVIES_ADDED_ON_BUTTON_CLICK
      });
    case ActionType.RESET_COUNT_MOVIES_SHOW:
      return Object.assign({}, state, {
        countMoviesShow: SHOWING_MOVIES_COUNT_ON_START
      });
    default:
      return state;
  }
};
