import React, {PureComponent} from "react";

const withVideoPlay = (Component) => {
  class WithVideoPlay extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
        secondsPlayed: 0,
        togglerValue: 0,
      };

      this.clickPlayHandler = this.clickPlayHandler.bind(this);
      this.clickPauseHandler = this.clickPauseHandler.bind(this);
      this.setIntervalForVideoPLayer = this.setIntervalForVideoPLayer.bind(this);
    }

    clickPlayHandler() {
      // if (videoRef.readyState === 2) {
      this.setState({isPlaying: true});
      // }
    }

    clickPauseHandler() {
      this.setState({isPlaying: false});
    }

    _getTotalDurationRaw(videoRef) {
      if (videoRef) {
        return Math.floor(videoRef.duration);
      } else {
        return ``;
      }
    }

    calculateOnePercent(videoRef) {
      if (this.state.isPlaying) {
        const onePercent = 100 / this._getTotalDurationRaw(videoRef);
        return onePercent;
      } else {
        const onePercent = 0;
        return onePercent;
      }
    }

    setIntervalForVideoPLayer(videoRef) {
      if (videoRef) {
        this.interval = setInterval(() => this.setState({secondsPlayed: this.state.secondsPlayed, togglerValue: this.state.togglerValue + this.calculateOnePercent(videoRef)}), 1000);
      }
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render() {
      return (
        <Component
          {...this.props}
          isPlaying={this.state.isPlaying}
          secondsPlayed={this.state.secondsPlayed}
          togglerValue={this.state.togglerValue}
          clickPlayHandler={this.clickPlayHandler}
          clickPauseHandler={this.clickPauseHandler}
          setIntervalForVideoPLayer={this.setIntervalForVideoPLayer}
        />
      );
    }
  }

  return WithVideoPlay;
};

export default withVideoPlay;
