import React from "react";
import rerender from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {MemoryRouter} from "react-router";
import NameSpace from "../../reducer/name-space.js";

import {MovieDetails} from "./movie-details.jsx";

const mockStore = configureStore([]);

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
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
    runTime: `01h30m`,
    link: `movie-page.html`,
    id: 1,
    backgroundColor: `background_color`,
    isFavorite: true,
  },
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
    runTime: `01h30m`,
    link: `movie-page.html`,
    id: 3,
    backgroundColor: `background_color`,
    isFavorite: true,
  }
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
  runTime: `01h30m`,
  link: `movie-page.html`,
  id: 2,
  backgroundColor: `background_color`,
  isFavorite: true,
};

describe(`MoviePage test`, () => {
  it(`Should MoviePage component render correctly`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        movies: [{
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
          runTime: `01h30m`,
          link: `movie-page.html`,
          id: 1,
          backgroundColor: `background_color`,
          isFavorite: true,
        },
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
          runTime: `01h30m`,
          link: `movie-page.html`,
          id: 2,
          backgroundColor: `background_color`,
          isFavorite: true,
        }],
        promoMovie: {}
      },
      [NameSpace.CONDITION]: {
        currentGenre: ``,
        countMoviesShow: ``,
      },
      [NameSpace.USER]: {
        authorizationStatus: `s`,
      }
    });
    const tree = rerender
      .create(
          <Provider store={store}>
            <MemoryRouter>
              <MovieDetails
                movie={movieAsObject}
                onMovieCardClick={() => {}}
                similarMovies={movies}
                onLoadComments={() => {}}
                onChangeVideoPlayerState={() => {}}
                isVideoPlayerOpened={false}
                onFavoriteButtonClick={() => {}}
                comments={[]}
              />
            </MemoryRouter>
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
