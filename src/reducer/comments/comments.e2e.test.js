import {reducer, ActionType} from "./comments.js";


const initialState = {
  isLoading: false,
  comments: [],
  isCommentsLoaded: false,
};

const commentsArray = [
  {
    title: `s`,
    text: `e`,
  },
  {
    title: `s`,
    text: `e`,
  }
];

describe(`Check user reducer`, () => {
  it(`it should return default initialState when passed nothing`, () => {
    expect(reducer(void 0, {})).toEqual(initialState);
  });

  it(`it should set comments`, () => {
    expect(reducer({}, {type: ActionType.SET_COMMENTS, payload: commentsArray})).toEqual({comments: commentsArray});
  });
});
