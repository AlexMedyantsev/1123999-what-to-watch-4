import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VideoPlayer from "./video-player.jsx";

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
      <VideoPlayer
        source={movie.preview}
        poster={movie.image}
        isMuted={Video.IS_MUTED}
        isPlaying={isVideoPlaying}
        width={Video.WIDTH}
        height={Video.HEIGHT}
      />
  );

  const activePlayerInstance = videoPlayer.instance();
  activePlayerInstance.componentDidUpdate(videoPlayer.props.isPlaying);

  expect(videoPlayer.state(videoPlayer.props.isPlaying)).toBe(false);
  expect(videoPlayer.props().isPlaying).toBe(isVideoPlaying);

  isVideoPlaying = true;

  videoPlayer = mount(
      <VideoPlayer
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
