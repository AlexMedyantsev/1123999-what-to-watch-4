import React, {PureComponent} from "react";

const withPreviewVideoPlay = (Component) => {
  class WithPreviewVideoPlay extends PureComponent {
    constructor(props) {
      super(props);

      this.timerId = null;

      this.state = {
        isPlaying: false,
      };

      this.handlerMouseEnter = this.handlerMouseEnter.bind(this);
      this.handlerMouseLeave = this.handlerMouseLeave.bind(this);
    }

    handlerMouseEnter() {
      this.timerId = setTimeout(() =>
        this.setState({
          isPlaying: true
        }), 1000);
    }

    handlerMouseLeave() {
      clearTimeout(this.timerId);

      this.setState({
        isPlaying: false
      });
    }

    componentWillUnmount() {
      clearTimeout(this.timerId);
    }

    render() {
      return (
        <Component
          {...this.props}
          isPlaying={this.state.isPlaying}
          handlerMouseEnter={this.handlerMouseEnter}
          handlerMouseLeave={this.handlerMouseLeave}
        />
      );
    }
  }

  return WithPreviewVideoPlay;
};

export default withPreviewVideoPlay;
