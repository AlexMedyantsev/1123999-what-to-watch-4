import {GENRES, SHOWING_MOVIES_COUNT_ON_START, MOVIES_ADDED_ON_BUTTON_CLICK} from "../../utils/consts.js";

export const initialState = {
  currentGenre: GENRES.ALL,
  countMoviesShowed: SHOWING_MOVIES_COUNT_ON_START,
  isError: false,
  errorMessage: null,
  activeMovie: null,
};

export const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  SET_ACTIVE_MOVIE: `SET_ACTIVE_MOVIE`,
  INCREMENT_COUNT_MOVIES_SHOW: `INCREMENT_COUNT_MOVIES_SHOW`,
  RESET_COUNT_MOVIES_SHOW: `RESET_COUNT_MOVIES_SHOW`,
  CHANGE_ERROR_FLAG: `CHANGE_ERROR_FLAG`,
  SET_ERROR_MESSAGE: `SET_ERROR_MESSAGE`,
};

export const ActionCreator = {
  setCurrentGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
  setActiveMovie: (movie) => ({
    type: ActionType.SET_ACTIVE_MOVIE,
    payload: movie,
  }),
  incrementCountMoviesShow: () => ({
    type: ActionType.INCREMENT_COUNT_MOVIES_SHOW,
  }),
  resetCountMoviesShow: () => ({
    type: ActionType.RESET_COUNT_MOVIES_SHOW,
  }),
  changeErrorFlag: () => ({
    type: ActionType.CHANGE_ERROR_FLAG,
  }),
  setErrorMessage: (error) => ({
    type: ActionType.SET_ERROR_MESSAGE,
    payload: error,
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
    case ActionType.SET_ERROR_MESSAGE:
      return Object.assign({}, state, {
        errorMessage: action.payload,
      });
    case ActionType.INCREMENT_COUNT_MOVIES_SHOW:
      return Object.assign({}, state, {
        countMoviesShowed: state.countMoviesShowed + MOVIES_ADDED_ON_BUTTON_CLICK
      });
    case ActionType.CHANGE_ERROR_FLAG:
      return Object.assign({}, state, {
        isError: !state.isError,
      });
    case ActionType.RESET_COUNT_MOVIES_SHOW:
      return Object.assign({}, state, {
        countMoviesShowed: SHOWING_MOVIES_COUNT_ON_START
      });
    default:
      return state;
  }
};
