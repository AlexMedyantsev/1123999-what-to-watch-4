import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";
import movies from "../../mocks/movies.js";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

import {GENRES} from "../../utils/consts.js";

const mockStore = configureStore([]);

describe(`MovieList snapshot`, () => {
  it(`Should movies list render correctly`, () => {
    const store = mockStore({
      genre: GENRES.ALL,
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <MoviesList
              movies={movies}
              onMovieCardClick={() => {}}
            />
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
