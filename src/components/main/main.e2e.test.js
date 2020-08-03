import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import Main from "./main.jsx";

import {GENRES} from "../../utils/consts.js";


Enzyme.configure({
  adapter: new Adapter()
});

const mockStore = configureStore([]);

const HeaderMovieData = {
  title: `TENET`,
  genre: `Drama`,
  year: 2020
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
    id: 1,
    backgroundColor: `background_color`,
    isFavorite: true,
  }
];

describe(`Click button`, () => {
  it(`Should title link be pressed`, () => {
    const onMovieClick = jest.fn();
    const store = mockStore({
      DATA: {
        movies,
      },
      CONDITION: {
        currentGenre: GENRES.ALL,
      },
      PLAYER: {
        isVideoPlayerOpened: false,
      }
    });

    const main = shallow(
        <Provider store={store}>
          <Main
            headerMovieTitle={HeaderMovieData.title}
            headerMovieGenre={HeaderMovieData.genre}
            headerMovieYear={HeaderMovieData.year}
            movies={movies}
            onMovieClick={onMovieClick}
          />
        </Provider>
    );

    const movieTitleLinks = main.find(`a.small-movie-card__link`);

    movieTitleLinks.forEach((titleLink) => {
      titleLink.props().onClick();
    });

    expect(onMovieClick.mock.calls.length).toBe(movieTitleLinks.length);
  });
});
