import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/player/player.js";
import {ESCAPE_KEY} from "../../utils/consts.js";
import {formatSeconds} from "../../utils/common.js";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._handleEscPress = this._handleEscPress.bind(this);
    this._handleEscClick = this._handleEscClick.bind(this);
    this._clickFullScreenHandler = this._clickFullScreenHandler.bind(this);

    this._playVideo = this._playVideo .bind(this);
    this._pauseVideo = this._pauseVideo .bind(this);

    this._videoRef = createRef();
    this._togglerRef = createRef();
    this._progressBarRef = createRef();
    this._videoContainerRef = createRef();
  }

  componentDidMount() {
    if (this._videoRef) {
      const video = this._videoRef.current;
      this.interval = this.props.setIntervalForVideoPLayer(this._videoRef.current);
      video.src = this.props.movieLink;
    }
    document.addEventListener(`keydown`, this._handleEscPress);
  }

  componentDidUpdate(prevProps) {
    const {isPlaying} = this.props;
    const video = this._videoRef.current;

    if (isPlaying !== prevProps.isPlaying) {
      if (isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    clearInterval(this.interval);
    document.removeEventListener(`keydown`, this._handleEscPress);

    video.onplay = null;
    video.onpause = null;
    video.ontimeupdate = null;
    video.src = ``;
  }

  _handleEscClick() {
    this.props.onChangeVideoPlayerState();
  }

  _handleEscPress(event) {
    if (event.keyCode === ESCAPE_KEY) {
      this.props.onChangeVideoPlayerState();
    }
  }

  _playVideo() {
    this.props.clickPlayHandler();
  }

  _pauseVideo() {
    this.props.clickPauseHandler();
  }

  _getCurrentPlayTimeLeft() {
    const video = this._videoRef.current;
    const totalTime = this._getTotalDurationRaw();

    if (video) {
      const currentPlayTime = formatSeconds(totalTime - video.currentTime);
      return currentPlayTime;
    } else {
      return ``;
    }
  }

  _toggleFullScreen() {
    const videoContainer = this._videoContainerRef.current;

    if (!document.fullscreenElement && videoContainer) {
      videoContainer.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  _clickFullScreenHandler() {
    this._toggleFullScreen();
  }

  _updateProgressBarPosition() {
    const progressBar = this._progressBarRef.current;

    if (progressBar) {
      progressBar.value = this.props.togglerValue;
    }
  }

  _updateTogglerPosition() {
    const toggler = this._togglerRef.current;

    if (toggler) {
      toggler.style.left = this.props.togglerValue + `%`;
    }
  }

  _getTotalDuration() {
    const video = this._videoRef.current;

    if (video) {
      return formatSeconds(video.duration);
    } else {
      return ``;
    }
  }

  _getTotalDurationRaw() {
    const video = this._videoRef.current;
    if (video) {
      return Math.floor(video.duration);
    } else {
      return ``;
    }
  }

  render() {
    const {movieLink, movieTitle, isPlaying} = this.props;

    if (isPlaying) {
      this._updateTogglerPosition();
      this._updateProgressBarPosition();
    }

    return (
      <div className="player" ref={this._videoContainerRef}>
        <video src={movieLink} ref={this._videoRef} className="player__video" poster="img/player-poster.jpg"></video>

        <button type="button" onClick={this._handleEscClick} className="player__exit">Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" ref={this._progressBarRef} value="0" max="100"></progress>
              <div className="player__toggler" ref={this._togglerRef}>Toggler</div>
            </div>
            <div className="player__time-value">{this._getCurrentPlayTimeLeft()}</div>
          </div>

          <div className="player__controls-row">
            {isPlaying ?
              <button type="button" onClick={this._pauseVideo} className="player__play">
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"></use>
                </svg>
                <span>Pause</span>
              </button>
              :
              <button type="button" onClick={this._playVideo} className="player__play">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 0L19 9.5L0 19V0Z" fill="#EEE5B5"/>
                </svg>
                <span>Play</span>
              </button>
            }
            <div className="player__name">{movieTitle}</div>

            <button type="button" onClick={this._clickFullScreenHandler} className="player__full-screen">
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>

    );

  }
}

VideoPlayer.propTypes = {
  onChangeVideoPlayerState: PropTypes.func.isRequired,
  movieLink: PropTypes.string.isRequired,
  movieTitle: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  clickPlayHandler: PropTypes.func.isRequired,
  clickPauseHandler: PropTypes.func.isRequired,
  setIntervalForVideoPLayer: PropTypes.func.isRequired,
  togglerValue: PropTypes.number.isRequired,
};


const mapStateToProps = () => {
  return {
  };
};

const mapDispatchToProps = {
  onChangeVideoPlayerState: ActionCreator.changeVideoPlayerState,
};

export {VideoPlayer};
export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
