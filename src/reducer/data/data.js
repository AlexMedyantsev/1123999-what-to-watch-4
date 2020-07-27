import {extend} from "../../utils/common.js";
import adaptMovies from '../../adapters/movies.js';

const initialState = {
  movies: [],
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
};

const ActionCreator = {
  loadMovies: (movies) => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: movies,
    };
  },
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((responce) => {
        dispatch(ActionCreator.loadMovies(adaptMovies(responce.data)));
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {movies: action.payload});
  }

  return state;
};

export {reducer, ActionCreator, ActionType, Operation};
