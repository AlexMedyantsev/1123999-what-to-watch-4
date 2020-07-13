import React from "react";
import rerender from "react-test-renderer";
import App from "./app.jsx";

import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {GENRES, MOVIES_ADDED_ON_BUTTON_CLICK} from "../../utils/consts.js";
import movies from "../../mocks/movies.js";


const HeaderMovieData = {
  TITLE: `Movie Title`,
  GENRE: `Drama`,
  YEAR: 2009,
};

const mockStore = configureStore([]);

describe(`Render component`, () => {
  it(`Should App render correctly`, () => {
    const store = mockStore({
      genre: GENRES.ALL,
      movies,
      countMoviesRender: MOVIES_ADDED_ON_BUTTON_CLICK
    });
    const tree = rerender
      .create(
          <Provider store={store}>
            <App
              title={HeaderMovieData.TITLE}
              genre={HeaderMovieData.GENRE}
              year={HeaderMovieData.YEAR}
              movies={movies}
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
