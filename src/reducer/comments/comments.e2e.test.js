import {reducer, ActionType} from "./comments.js";


const initialState = {
  comments: [],
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

describe(`Check comments reducer`, () => {
  it(`it should return default initialState when passed nothing`, () => {
    expect(reducer(void 0, {})).toEqual(initialState);
  });

  it(`it should load comments`, () => {
    expect(reducer({}, {type: ActionType.LOAD_COMMENTS, payload: commentsArray})).toEqual({comments: commentsArray});
  });
});
