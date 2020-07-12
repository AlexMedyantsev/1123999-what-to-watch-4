import {GENRES, SHOWING_MOVIES_COUNT_ON_START} from "./utils/consts.js";

const initialState = {
  genre: GENRES.ALL
};

export const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
};

export const ActionCreator = {
  setActiveGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return Object.assign({}, state, {
        genre: action.payload,
        showedMoviesCount: SHOWING_MOVIES_COUNT_ON_START,
      });
    default:
      return state;
  }
};
