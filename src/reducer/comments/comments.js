import {extend} from "../../utils/common.js";
import {SERVER_ROUTE} from "../../utils/consts.js";

const initialState = {
  comments: [],
};

const ActionType = {
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  SET_COMMENTS: `SET_COMMENTS`,
  ADD_COMMENT: `ADD_COMMENT`,
};

const ActionCreator = {
  loadComments: (comments) => {
    return {
      type: ActionType.LOAD_COMMENTS,
      payload: comments,
    };
  },
  // addComment: (comment) => {
  //   return {
  //     type: ActionType.ADD_COMMENT,
  //     payload: comment,
  //   };
  // },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_COMMENTS:
      console.log(`check reducer trigger`);
      return extend(state, {
        comments: action.payload,
      });
    // case ActionType.ADD_COMMENT:
    //   console.log(`check reducer trigger`);
    //   return extend(state, {
    //     comments: [...state.comments, action.payload],
    //   });
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
        // Operation.loadComments(movieId);
      });
  },

  loadComments: (movieId) => (dispatch, getState, api) => {
    return api.get(SERVER_ROUTE.POST_COMMENT + movieId)
      .then((response) => {
        console.log(`check loadComments trigger`);
        dispatch(ActionCreator.loadComments(response.data));
      });
  },
};

export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
};
