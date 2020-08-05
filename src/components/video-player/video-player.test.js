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


it(`VideoPlayer is rendered correctly`, () => {
  const {preview, title, isPlaying} = movie;

  const mockFunction = jest.fn();
  const store = mockStore({
  });

  const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <VideoPlayer
            movieLink={preview}
            movieTitle={title}
            isPlaying={isPlaying}
            clickPlayHandler={mockFunction}
            clickPauseHandler={mockFunction}
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
