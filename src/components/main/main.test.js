import React from "react";
import rerender from "react-test-renderer";
import Main from "./main.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {GENRES, SHOWING_MOVIES_COUNT_ON_START} from "../../utils/consts.js";
import AuthorizationStatus from "../../reducer/user/user.js";
import {BrowserRouter} from "react-router-dom";

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
    isFavorite: true
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
  it(`Should Main render correctly`, () => {
    const store = mockStore({
      DATA: {
        movies,
      },
      CONDITION: {
        currentGenre: GENRES.ALL,
        countMoviesShow: SHOWING_MOVIES_COUNT_ON_START
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
            <BrowserRouter>
              <Main
                title={HeaderMovieData.TITLE}
                genre={HeaderMovieData.GENRE}
                year={HeaderMovieData.YEAR}
                movies={movies}
                promoMovie={movieAsObject}
                onMovieCardClick={() => {}}
                onMouseEnter={() => {}}
              />,
            </BrowserRouter>
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
