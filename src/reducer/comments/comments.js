import {extend} from "../../utils/common.js";
import history from "../../history.js";
import {SERVER_ROUTE} from "../../utils/consts.js";


const AuthorizationStatus = {
  NO_AUTH: `NO_AUTH`,
  AUTH: `AUTH`
};

const initialState = {
  isLoading: false,
  comments: [],
  isCommentsLoaded: false,
};

const ActionType = {
  SET_COMMENTS: `SET_COMMENTS`,
  SET_IS_LOADING: `SET_IS_LOADING`,
  SET_COMMENTS_IS_LOADED: `SET_COMMENTS_IS_LOADED`,
};

const ActionCreator = {
  setComments: (comments) => {
    return {
      type: ActionType.SET_COMMENTS,
      payload: comments
    };
  },
  setIsLoading: (value) => {
    return {
      type: ActionType.SET_IS_LOADING,
      payload: value,
    };
  },
  setCommentsIsLoaded: (value) => {
    return {
      type: ActionType.SET_COMMENTS_IS_LOADED,
      payload: value,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_COMMENTS:
      return extend(state, {
        comments: action.payload,
      });
  }
  return state;
};

const Operation = {
  sendComment: ({movieId, rating, comment}) => (dispatch, getState, api) => {
    return api.post(`/comments/${movieId}`, {rating, comment})
      .then(() => {
        history.push(`${SERVER_ROUTE.MOVIES}/${movieId}`);
      });
  },
  getComments: (movieId) => (dispatch, getState, api) => {
    return api.get(`/comments/${movieId}`)
      .then((response) => {
        const comments = response.data;
        dispatch(ActionCreator.setComments(comments));
        dispatch(ActionCreator.setCommentsIsLoaded(true));
      });
  },
};

export {
  ActionCreator,
  ActionType,
  AuthorizationStatus,
  Operation,
  reducer,
};
