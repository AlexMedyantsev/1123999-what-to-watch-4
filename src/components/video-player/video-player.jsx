import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {isPlaying: props.isPlaying};

    this._videoRef = createRef();
  }

  componentDidMount() {
    const {isMuted, poster, source, width, height} = this.props;
    const video = this._videoRef.current;

    if (isMuted) {
      video.muted = true;
    }

    video.src = source;
    video.width = width;
    video.poster = poster;
    video.height = height;
  }

  componentDidUpdate(prevProps) {
    const {isPlaying} = this.props;
    const video = this._videoRef.current;

    if (this.props.isPlaying !== prevProps.isPlaying) {
      if (isPlaying) {
        video.play();
      } else {
        video.pause();
        video.load();
      }
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.onplay = null;
    video.onpause = null;
    video.ontimeupdate = null;
    video.src = ``;
  }

  render() {
    return (
      <video
        ref={this._videoRef}>
        Sorry, this preview is not available in your browser
      </video>
    );
  }
}

VideoPlayer.propTypes = {
  source: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  isMuted: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default VideoPlayer;
