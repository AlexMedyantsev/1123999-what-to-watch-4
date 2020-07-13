import {reducer, initialState, ActionCreator} from "./reducer.js";
import moviesMock from "./mocks/movies.js";
import {SHOWING_MOVIES_COUNT_ON_START} from "./utils/consts.js";

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

describe(`Reducer tests`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual(initialState);
  });

  it(`Action working correctly`, () => {
    const newInitialState = {
      currentGenre: moviesMock[2].genre,
      movies: [],
      countMoviesShow: SHOWING_MOVIES_COUNT_ON_START
    };

    expect(reducer(initialState, ActionCreator.setCurrentGenre(moviesMock[2].genre))).toEqual(newInitialState);
  });

  it(`incrementCountMoviesRender working correctly`, () => {
    const newInitialState = {
      currentGenre: GENRES.ALL,
      movies: [],
      countMoviesShow: SHOWING_MOVIES_COUNT_ON_START + 8
    };
    expect(reducer(initialState, ActionCreator.incrementCountMoviesShow())).toEqual(newInitialState);
  });

  it(`setMovies working correctly`, () => {
    const newInitialState = {
      currentGenre: GENRES.ALL,
      movies: moviesMock,
      countMoviesShow: SHOWING_MOVIES_COUNT_ON_START,
    };
    expect(reducer(initialState, ActionCreator.setMovies(moviesMock))).toEqual(newInitialState);
  });

  it(`resetCountMoviesRender`, () => {
    const newInitialState = {
      currentGenre: GENRES.ALL,
      movies: [],
      countMoviesShow: SHOWING_MOVIES_COUNT_ON_START + SHOWING_MOVIES_COUNT_ON_START,
    };
    expect(reducer(newInitialState, ActionCreator.resetCountMoviesShow())).toEqual(initialState);
  });
});
