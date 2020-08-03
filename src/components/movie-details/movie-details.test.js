import React from "react";
import renderer from "react-test-renderer";
import MovieDetails from "./movie-details.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {GENRES, SHOWING_MOVIES_COUNT_ON_START} from "../../utils/consts.js";
import AuthorizationStatus from "../../reducer/user/user.js";

const mockStore = configureStore([]);

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
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
    runTime: 22,
    link: `movie-page.html`,
    id: 1,
    backgroundColor: `background_color`,
    isFavorite: true,
  },
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
  runTime: 22,
  link: `movie-page.html`,
  id: 1,
  backgroundColor: `background_color`,
  isFavorite: true,
};

describe(`Movie Details Snapshot`, () => {
  it(`Should MovieDetails render correctly`, () => {
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
    const tree = renderer
      .create(
          <Provider store={store}>
            <Router history={history}>
              <MovieDetails
                movie={movieAsObject}
                onMovieCardClick={() => {}}
                similarMovies={movies}
              />
            </Router>
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});


