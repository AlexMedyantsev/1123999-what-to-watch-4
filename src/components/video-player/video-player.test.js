import VideoPlayer from "./video-player.jsx";
import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import configureStore from "redux-mock-store";

const movie = {
  preview: `https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4`,
  title: `The Legend`,
  isPlaying: false,
};

const mockStore = configureStore([]);

const moviesMock = [
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
  }];

it(`VideoPlayer is rendered correctly`, () => {
  const mockFunction = jest.fn();
  const store = mockStore({
  });

  const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <VideoPlayer
            activeMovie={moviesMock[0]}
            isPlaying={true}
            clickPlayHandler={mockFunction}
            clickPauseHandler={mockFunction}
            setIntervalForVideoPLayer={mockFunction}
            togglerValue={1}
          />,
        </BrowserRouter>
      </Provider>, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
