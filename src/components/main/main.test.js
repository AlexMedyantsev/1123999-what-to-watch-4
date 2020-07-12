import React from "react";
import rerender from "react-test-renderer";
import Main from "./main.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {GENRES} from "../../utils/consts.js";


const HeaderMovieData = {
  TITLE: `Movie Title`,
  GENRE: `Drama`,
  YEAR: 2009,
};

const mockStore = configureStore([]);

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

describe(`Render component`, () => {
  it(`Should Main render correctly`, () => {
    const store = mockStore({
      genre: GENRES.ALL,
    });
    const tree = rerender
      .create(
          <Provider store={store}>
            <Main
              title={HeaderMovieData.TITLE}
              genre={HeaderMovieData.GENRE}
              year={HeaderMovieData.YEAR}
              movies={MOVIES}
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
