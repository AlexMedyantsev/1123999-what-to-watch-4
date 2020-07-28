import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();
  }

  componentDidMount() {
    const {isMuted, poster, previewLink, width, height} = this.props;
    const video = this._videoRef.current;

    if (isMuted) {
      video.muted = true;
    }

    video.src = previewLink;
    video.width = width;
    video.poster = poster;
    video.height = height;
  }

  componentDidUpdate(prevProps) {
    const {isPlaying, previewLink} = this.props;
    const video = this._videoRef.current;

    if (this.props.isPlaying !== prevProps.isPlaying) {
      if (isPlaying) {
        video.src = previewLink;
        video.play();
      } else {
        video.src = ``;
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
  isPlaying: PropTypes.bool.isRequired,
  previewLink: PropTypes.string,
  poster: PropTypes.string.isRequired,
  isMuted: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default VideoPlayer;
