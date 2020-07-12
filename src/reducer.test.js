import {reducer, initialState, ActionCreator} from "./reducer.js";

const GENRES = {
  ALL: `All genres`,
  ADVENTURE: `Adventure`,
  COMEDIES: `Comedy`,
  CRIME: `Crime`,
  DOCUMENTARY: `Documentary`,
  DRAMAS: `Drama`,
  FANTASY: `Fantasy`,
  HORROR: `Horror`,
  KIDS_AND_FAMILY: `Kid's and Family`,
  ROMANCE: `Romance`,
  SCI_FI: `Sci - Fi`,
  STORY: `Story`,
  THRILLERS: `Thriller`,
};

const DEFAULT_GENRE = `All genres`;

it(`Should initial state change correctly`, () => {
  expect(reducer(void 0, {})).toEqual({genre: DEFAULT_GENRE});
});

it(`Should initial state change correctly`, () => {
  const Action = ActionCreator.genreAction(GENRES.STORY);
  expect(reducer(initialState, Action)).toEqual({genre: GENRES.STORY, showedMoviesCount: 8});
});
