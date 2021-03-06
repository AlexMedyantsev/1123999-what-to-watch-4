import React from "react";
import rerender from "react-test-renderer";
import App from "./app.jsx";

import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {GENRES, SHOWING_MOVIES_COUNT_ON_START} from "../../utils/consts.js";
import AuthorizationStatus from "../../reducer/user/user.js";


const HeaderMovieData = {
  TITLE: `Movie Title`,
  GENRE: `Drama`,
  YEAR: 2009,
};

const movies = [
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
    isFavorite: true,
  }
];

const movieAsObject = {
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
  starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
  runTime: `01h30m`,
  link: `movie-page.html`,
  id: 1,
  backgroundColor: `background_color`,
  isFavorite: true,
};

const mockStore = configureStore([]);

describe(`Render component`, () => {
  it(`Should App render correctly`, () => {
    const store = mockStore({
      DATA: {
        movies,
        promoMovie: movieAsObject,
      },
      CONDITION: {
        currentGenre: GENRES.ALL,
        countMoviesShow: SHOWING_MOVIES_COUNT_ON_START,
        activeMovie: movieAsObject,
        isError: false,
      },
      USER: {
        authorizationStatus: AuthorizationStatus,
      },
      PLAYER: {
        isVideoPlayerOpened: false,
      }
    });
    const tree = rerender
      .create(
          <Provider store={store}>
            <App
              title={HeaderMovieData.TITLE}
              genre={HeaderMovieData.GENRE}
              year={HeaderMovieData.YEAR}
              authorizationStatus={AuthorizationStatus}
              isError={false}
              movies={movies}
              promoMovie={movieAsObject}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
