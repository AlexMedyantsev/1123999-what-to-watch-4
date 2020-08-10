import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withPopupMessage = (Component) => {
  class WithPopupMessage extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {visible: true};

      this.setTimer = this.setTimer.bind(this);
    }

    componentDidMount() {
      this.setTimer();
    }

    componentDidUpdate(nextProps) {
      if (nextProps.children !== this.props.children) {
        this.setTimer();
        this.setState({visible: true});
      }
    }

    setTimer() {
      if (this._timer !== null) {
        clearTimeout(this._timer);
      }

      this._timer = setTimeout(function () {
        this._timer = null;
        this.setState({visible: false});
      }.bind(this), 5000);
    }

    componentWillUnmount() {
      clearTimeout(this._timer);
    }

    render() {
      return (
        <Component
          isVisible={this.state.visible}
          errorMessage={this.props.errorMessage}
        />
      );
    }
  }

  WithPopupMessage.propTypes = {
    errorMessage: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    children: PropTypes.any,
  };

  return WithPopupMessage;
};

export {withPopupMessage};
