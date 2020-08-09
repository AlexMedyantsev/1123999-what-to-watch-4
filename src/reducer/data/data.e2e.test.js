import {reducer, ActionType} from "./data.js";

const initialState = {
  movies: [],
  isFavoriteMovies: [],
  promoMovie: null,
};

const moviesArray = [
  {
    image: `a`,
    posterSrc: `a`,
    bgSrc: `a`,
    title: `Name`,
    genre: `Genre`,
    year: 2014,
    score: 8.9,
    level: `level`,
    movieLink: `link`,
    previewLink: `preview-link`,
    scoresCount: 220,
    description: `description`,
    director: `director`,
    starring: [`starring`, `next`],
    runTime: `01h30m`,
    link: `movie-page.html`,
    id: 1,
    backgroundColor: `background_color`,
    isFavorite: true
  },
  {
    image: `a`,
    posterSrc: `a`,
    bgSrc: `a`,
    title: `Name`,
    genre: `Genre`,
    year: 2014,
    score: 8.9,
    level: `level`,
    movieLink: `link`,
    previewLink: `preview-link`,
    scoresCount: 220,
    description: `description`,
    director: `director`,
    starring: [`starring`, `next`],
    runTime: `01h30m`,
    link: `movie-page.html`,
    id: 2,
    backgroundColor: `background_color`,
    isFavorite: true
  }
];

describe(`Check user reducer`, () => {
  it(`it should return default initialState when passed nothing`, () => {
    expect(reducer(void 0, {})).toEqual(initialState);
  });

  it(`it should load Movies`, () => {
    expect(reducer({}, {type: ActionType.LOAD_MOVIES, payload: moviesArray})).toEqual({movies: moviesArray});
  });

  it(`it should load Promo Movie`, () => {
    expect(reducer({}, {type: ActionType.LOAD_PROMO_MOVIE, payload: moviesArray[0]})).toEqual({promoMovie: moviesArray[0]});
  });

  it(`it should load isFavorite Movies`, () => {
    expect(reducer({}, {type: ActionType.LOAD_IS_FAVORITE_MOVIES, payload: moviesArray})).toEqual({isFavoriteMovies: moviesArray});
  });

  it(`it should update movie correctly`, () => {
    const updatedArray = [{
      image: `a`,
      posterSrc: `a`,
      bgSrc: `a`,
      title: `Name`,
      genre: `Genre`,
      year: 2014,
      score: 8.9,
      level: `level`,
      movieLink: `link`,
      previewLink: `preview-link`,
      scoresCount: 220,
      description: `description`,
      director: `director`,
      starring: [`starring`, `next`],
      runTime: `01h30m`,
      link: `movie-page.html`,
      id: 1,
      backgroundColor: `background_color`,
      isFavorite: false,
    },
    {
      image: `a`,
      posterSrc: `a`,
      bgSrc: `a`,
      title: `Name`,
      genre: `Genre`,
      year: 2014,
      score: 8.9,
      level: `level`,
      movieLink: `link`,
      previewLink: `preview-link`,
      scoresCount: 220,
      description: `description`,
      director: `director`,
      starring: [`starring`, `next`],
      runTime: `01h30m`,
      link: `movie-page.html`,
      id: 2,
      backgroundColor: `background_color`,
      isFavorite: true
    },
    ];

    expect(reducer({movies: moviesArray}, {type: ActionType.UPDATE_MOVIE, payload: updatedArray[0]})).toEqual({movies: updatedArray});
  });

  it(`it should update promo Movie correctly`, () => {
    const updatedPromoMovie = {
      image: `a`,
      posterSrc: `a`,
      bgSrc: `a`,
      title: `Name`,
      genre: `Genre`,
      year: 2014,
      score: 8.9,
      level: `level`,
      movieLink: `link`,
      previewLink: `preview-link`,
      scoresCount: 220,
      description: `description`,
      director: `director`,
      starring: [`starring`, `next`],
      runTime: `01h30m`,
      link: `movie-page.html`,
      id: 1,
      backgroundColor: `background_color`,
      isFavorite: false,
    };

    expect(reducer({promoMovie: moviesArray[0]}, {type: ActionType.UPDATE_PROMO_MOVIE, payload: updatedPromoMovie})).toEqual({promoMovie: updatedPromoMovie});
  });
});
