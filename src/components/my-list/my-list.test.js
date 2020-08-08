import React from "react";
import rerender from "react-test-renderer";
import MyList from "./my-list.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {GENRES, SHOWING_MOVIES_COUNT_ON_START} from "../../utils/consts.js";
import AuthorizationStatus from "../../reducer/user/user.js";
import {BrowserRouter} from "react-router-dom";

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

const mockStore = configureStore([]);

describe(`Render component`, () => {
  it(`Should MyList render correctly`, () => {
    const store = mockStore({
      DATA: {
        movies,
        isFavoriteMovies: movies,
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
              <MyList
                movies={movies}
                isFavoriteMovies={movies}
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
