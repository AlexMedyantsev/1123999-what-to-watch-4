import React from "react";
import rerender from "react-test-renderer";
import Main from "./main.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {GENRES, SHOWING_MOVIES_COUNT_ON_START} from "../../utils/consts.js";


const HeaderMovieData = {
  TITLE: `Movie Title`,
  GENRE: `Drama`,
  YEAR: 2009,
};

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
    starring: [`starring`, `next`],
    runTime: 22,
    link: `movie-page.html`,
    key: `1`,
    backgroundColor: `background_color`,
    isFavorite: `is_favorite`
  }
];

const mockStore = configureStore([]);

describe(`Render component`, () => {
  it(`Should Main render correctly`, () => {
    const store = mockStore({
      DATA: {
        movies,
      },
      CONDITION: {
        currentGenre: GENRES.ALL,
        countMoviesShow: SHOWING_MOVIES_COUNT_ON_START
      }
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
