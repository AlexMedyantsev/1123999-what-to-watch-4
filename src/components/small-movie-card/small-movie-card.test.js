import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

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
  id: 1,
  backgroundColor: `background_color`,
  isFavorite: true,
};

const mockStore = configureStore([]);

describe(`it should SmallMovieCard render correctly`, () => {
  it(`Small card component`, () => {
    const store = mockStore({
      DATA: {
        movies: movieAsObject,
      },
      PLAYER: {
        isVideoPlayerOpened: false,
      }
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <SmallMovieCard
              movie={movieAsObject}
              index={Math.random() * 100}
              isPlaying={true}
              onMovieCardClick={() => {}}
              handlerMouseEnter={() => {}}
              handlerMouseLeave={() => {}}
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
