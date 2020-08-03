import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VideoPlayerPreview from "./video-player-preview.jsx";

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

Enzyme.configure({
  adapter: new Adapter()
});

it(`Video player can be playing or paused`, () => {
  const {image, preview} = movie;
  let isVideoPlaying = false;

  let videoPlayer = mount(
      <VideoPlayerPreview
        source={preview}
        poster={image}
        isMuted={Video.IS_MUTED}
        isPlaying={isVideoPlaying}
        width={Video.WIDTH}
        height={Video.HEIGHT}
      />
  );

  expect(videoPlayer.props().isPlaying).toBe(isVideoPlaying);

  isVideoPlaying = true;

  videoPlayer = mount(
      <VideoPlayerPreview
        source={preview}
        poster={image}
        isMuted={Video.IS_MUTED}
        isPlaying={isVideoPlaying}
        width={Video.WIDTH}
        height={Video.HEIGHT}
      />
  );

  expect(videoPlayer.props().isPlaying).toBe(isVideoPlaying);

  videoPlayer.unmount();
});
