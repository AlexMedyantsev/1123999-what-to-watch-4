import {extend} from "../../utils/common.js";
import {SERVER_ROUTE} from "../../utils/consts.js";


const AuthorizationStatus = {
  comments: []
};

const initialState = {
  isLoading: false,
  comments: [],
  isCommentsLoaded: false,
};

const ActionType = {
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  SET_COMMENTS: `SET_COMMENTS`,
};

const ActionCreator = {
  loadComments: (comments) => {
    return {
      type: ActionType.LOAD_COMMENTS,
      payload: comments,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_COMMENTS:
      return extend(state, {
        comments: action.payload,
      });
  }
  return state;
};

const Operation = {
  postComment: (commentData, movieId) => (dispatch, getState, api) => {
    return api.post(SERVER_ROUTE.POST_COMMENT + movieId, {
      rating: commentData.rating,
      comment: commentData.comment,
    })
      .then(() => {
        Operation.loadComments(movieId);
      });
  },

  loadComments: (movieId) => (dispatch, getState, api) => {
    return api.get(SERVER_ROUTE.POST_COMMENT + movieId)
      .then((response) => {
        dispatch(ActionCreator.loadComments(response.data));
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
