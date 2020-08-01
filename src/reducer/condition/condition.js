import {GENRES, SHOWING_MOVIES_COUNT_ON_START, MOVIES_ADDED_ON_BUTTON_CLICK} from "../../utils/consts.js";

export const initialState = {
  currentGenre: GENRES.ALL,
  countMoviesShowed: SHOWING_MOVIES_COUNT_ON_START,
  activeMovie: null,
};

export const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SET_ACTIVE_MOVIE: `SET_ACTIVE_MOVIE`,
  INCREMENT_COUNT_MOVIES_SHOW: `INCREMENT_COUNT_MOVIES_SHOW`,
  RESET_COUNT_MOVIES_SHOW: `RESET_COUNT_MOVIES_SHOW`
};

export const ActionCreator = {
  setCurrentGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
  setActiveMovie: (movie) => ({
    type: ActionType.SET_ACTIVE_MOVIE,
    payload: movie.id,
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
    case ActionType.SET_ACTIVE_MOVIE:
      return Object.assign({}, state, {
        activeMovie: action.payload,
      });
    case ActionType.INCREMENT_COUNT_MOVIES_SHOW:
      return Object.assign({}, state, {
        countMoviesShowed: state.countMoviesShowed + MOVIES_ADDED_ON_BUTTON_CLICK
      });
    case ActionType.RESET_COUNT_MOVIES_SHOW:
      return Object.assign({}, state, {
        countMoviesShowed: SHOWING_MOVIES_COUNT_ON_START
      });
    default:
      return state;
  }
};
