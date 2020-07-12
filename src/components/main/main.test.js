import React from "react";
import rerender from "react-test-renderer";
import Main from "./main.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import movies from "../../mocks/movies.js";
import {GENRES, SHOWING_MOVIES_COUNT_ON_START} from "../../utils/consts.js";


const HeaderMovieData = {
  TITLE: `Movie Title`,
  GENRE: `Drama`,
  YEAR: 2009,
};

const mockStore = configureStore([]);

describe(`Render component`, () => {
  it(`Should Main render correctly`, () => {
    const store = mockStore({
      currentGenre: GENRES.ALL,
      movies,
      countMoviesShow: SHOWING_MOVIES_COUNT_ON_START
    });
    const tree = rerender
      .create(
          <Provider store={store}>
            <Main
              title={HeaderMovieData.TITLE}
              genre={HeaderMovieData.GENRE}
              year={HeaderMovieData.YEAR}
              movies={movies}
              onMovieCardClick={() => {}}
              onMouseEnter={() => {}}
            />,
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
