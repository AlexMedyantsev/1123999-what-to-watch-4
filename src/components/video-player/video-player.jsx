import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/player/player.js";
import {ESCAPE_KEY} from "../../utils/consts.js";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._handleEscClick = this._handleEscClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener(`keydown`, this._handleEscClick);
  }

  componentWillUnmount() {
    document.removeEventListener(`keydown`, this._handleEscClick);
  }

  _handleEscClick(event) {
    if (event.keyCode === ESCAPE_KEY) {
      this.props.onChangeVideoPlayerState();
    }
  }

  render() {
    const {movieLink} = this.props;
    return (
      <div className="player">
        <video src={movieLink} className="player__video" poster="img/player-poster.jpg" controls></video>

        <button type="button" onClick={this._handleEscClick} className="player__exit">Exit</button>
      </div>

    );

  }
}

VideoPlayer.propTypes = {
  onChangeVideoPlayerState: PropTypes.func.isRequired,
  movieLink: PropTypes.string.isRequired,
};


const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = {
  onChangeVideoPlayerState: ActionCreator.changeVideoPlayerState,
};

export {VideoPlayer};
export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
