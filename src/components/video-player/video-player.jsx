import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {ESCAPE_KEY} from "../../utils/consts.js";
import {formatSeconds} from "../../utils/common.js";
import history from "../../history.js";

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
      this.props.setIntervalForVideoPLayer(this._videoRef.current);
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
    document.removeEventListener(`keydown`, this._handleEscPress);
  }

  _handleEscClick() {
    history.goBack();
  }

  _handleEscPress(event) {
    if (event.keyCode === ESCAPE_KEY) {
      history.goBack();
    }
  }

  _playVideo(videoRef) {
    if (videoRef.current.readyState > 3) {
      this.props.clickPlayHandler(videoRef);
    }
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
    const {activeMovie, isPlaying} = this.props;
    const {movieLink, title} = activeMovie;

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
              <button type="button" onClick={() => this._playVideo(this._videoRef)} className="player__play">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 0L19 9.5L0 19V0Z" fill="#EEE5B5"/>
                </svg>
                <span>Play</span>
              </button>
            }
            <div className="player__name">{title}</div>

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
  activeMovie: PropTypes.shape({
    movieLink: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  clickPlayHandler: PropTypes.func.isRequired,
  clickPauseHandler: PropTypes.func.isRequired,
  setIntervalForVideoPLayer: PropTypes.func.isRequired,
  togglerValue: PropTypes.number.isRequired,
};

export {VideoPlayer};
