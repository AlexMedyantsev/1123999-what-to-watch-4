import VideoPlayer from "./video-player.jsx";
import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import configureStore from "redux-mock-store";

const movie = {
  preview: `https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4`,
};

const mockStore = configureStore([]);


it(`VideoPlayer is rendered correctly`, () => {
  const {preview} = movie;

  const store = mockStore({
  });

  const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <VideoPlayer
            movieLink={preview}
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
