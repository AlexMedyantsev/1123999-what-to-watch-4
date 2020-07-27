import React from "react";
import renderer from "react-test-renderer";
import MovieDetails from "./movie-details.jsx";

import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {GENRES} from "../../utils/consts.js";

const mockStore = configureStore([]);

const movie = [
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
    runTime: `22`,
    link: `movie-page.html`,
    key: `1`,
    backgroundColor: `background_color`,
    isFavorite: `is_favorite`
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
  runTime: `22`,
  link: `movie-page.html`,
  key: `1`,
  backgroundColor: `background_color`,
  isFavorite: `is_favorite`
};

describe(`Movie Details Snapshot`, () => {
  it(`Should MovieDetails render correctly`, () => {
    const store = mockStore({
      genre: GENRES.ALL,
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <MovieDetails
              movie={movieAsObject}
              onMovieCardClick={() => {}}
              similarMovies={movie}
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


