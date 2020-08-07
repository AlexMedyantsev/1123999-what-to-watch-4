import React from "react";
import renderer from "react-test-renderer";
import MovieDetails from "./movie-details.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

import {Provider} from "react-redux";
import {GENRES, SHOWING_MOVIES_COUNT_ON_START} from "../../utils/consts.js";
import AuthorizationStatus from "../../reducer/user/user.js";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


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
    runTime: `01h30m`,
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
  runTime: `01h30m`,
  link: `movie-page.html`,
  id: 1,
  backgroundColor: `background_color`,
  isFavorite: true,
};

const comments = [
  {
    id: 1,
    user: {
      id: 13,
      name: `Zak`,
    },
    rating: 9,
    comment: `Unfortunately we don't have a reliable way to tell the true ratings of a movie.`,
    date: `2020-07-19T16:06:01.831Z`,
  }
];

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
      },
      COMMENTS: {
        comments,
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


