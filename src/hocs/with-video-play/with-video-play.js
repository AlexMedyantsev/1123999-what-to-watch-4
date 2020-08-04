import React, {PureComponent} from "react";

const withVideoPlay = (Component) => {
  class WithVideoPlay extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
      };

      this.clickPlayHandler = this.clickPlayHandler.bind(this);
      this.clickPauseHandler = this.clickPauseHandler.bind(this);
    }

    clickPlayHandler() {
      this.setState({isPlaying: true});
    }

    clickPauseHandler() {
      this.setState({isPlaying: false});
    }

    render() {
      return (
        <Component
          {...this.props}
          isPlaying={this.state.isPlaying}
          clickPlayHandler={this.clickPlayHandler}
          clickPauseHandler={this.clickPauseHandler}
        />
      );
    }
  }

  return WithVideoPlay;
};

export default withVideoPlay;
