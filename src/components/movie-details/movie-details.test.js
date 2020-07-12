import React from "react";
import renderer from "react-test-renderer";
import MovieDetails from "./movie-details.jsx";
import movies from "../../mocks/movies.js";

import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {GENRES} from "../../utils/consts.js";

const mockStore = configureStore([]);

const movie = {
  backgroundImage: `img/movie.jpg`,
  title: `The Movie`,
  releaseYear: 2014,
  genres: [`Drama`],
  poster: `img/movie-poster.jpg`,
  ratingScore: 8.9,
  ratingLevel: `Very Good`,
  ratingCount: 245,
  director: [`Wes Andreson`],
  starring: [`Actors`],
  description: [`description`],
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
              movie={movie}
              onMovieCardClick={() => {}}
              similarMovies={movies}
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


