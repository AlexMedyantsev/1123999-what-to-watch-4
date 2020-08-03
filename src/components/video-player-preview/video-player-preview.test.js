import VideoPlayerPreview from "./video-player-preview.jsx";
import React from "react";
import renderer from "react-test-renderer";

const Video = {
  WIDTH: 300,
  HEIGHT: 100,
  INTERVAL_IN_SEC: 1500,
  IS_MUTED: false,
};

const movie = {
  preview: `https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4`,
  image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
};

it(`VideoPlayerPreview is rendered correctly`, () => {
  const {preview, image} = movie;

  const tree = renderer.create(
      <VideoPlayerPreview
        source={preview}
        poster={image}
        isMuted={Video.IS_MUTED}
        isPlaying={true}
        width={Video.WIDTH}
        height={Video.HEIGHT}
      />, {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
