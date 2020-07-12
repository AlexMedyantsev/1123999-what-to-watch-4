import React from "react";
import rerender from "react-test-renderer";
import App from "./app.jsx";

import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {GENRES} from "../../utils/consts.js";


const HeaderMovieData = {
  TITLE: `Movie Title`,
  GENRE: `Drama`,
  YEAR: 2009,
};

const MOVIES = [
  {
    title: `Fantastic Beasts`,
    image: `./macbeth.jpg`,
    genres: [`Drama`, `Action`],
  },
  {
    title: `Bohemian Rhapsody`,
    image: `./macbeth.jpg`,
    genres: [`Thriller`, `Action`],
  },
  {
    title: `Macbeth`,
    image: `./macbeth.jpg`,
    genres: [`Drama`, `Action`],
  },
];

const mockStore = configureStore([]);

describe(`Render component`, () => {
  it(`Should App render correctly`, () => {
    const store = mockStore({
      genre: GENRES.ALL,
    });
    const tree = rerender
      .create(
          <Provider store={store}>
            <App
              title={HeaderMovieData.TITLE}
              genre={HeaderMovieData.GENRE}
              year={HeaderMovieData.YEAR}
              movies={MOVIES}
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
