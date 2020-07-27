import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

import {GENRES} from "../../utils/consts.js";

const mockStore = configureStore([]);

const moviesMock = [
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
    runTime: `22`,
    link: `movie-page.html`,
    key: `1`,
    backgroundColor: `background_color`,
    isFavorite: `is_favorite`
  }
];

describe(`MovieList snapshot`, () => {
  it(`Should movies list render correctly`, () => {
    const store = mockStore({
      genre: GENRES.ALL,
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <MoviesList
              movies={moviesMock}
              onMovieCardClick={() => {}}
              setActiveItem={() => {}}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
