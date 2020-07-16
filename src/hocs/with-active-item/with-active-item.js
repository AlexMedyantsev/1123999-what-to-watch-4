import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: null,
      };

      this.setActiveItem = this.setActiveItem.bind(this);
    }

    setActiveItem(activeItemName) {
      this.setState(
          {
            activeItem: activeItemName,
          }
      );
      if (this.props.changeActiveItem) {
        this.props.changeActiveItem(activeItemName);
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          activeItem={this.state.activeItem}
          setActiveItem={this.setActiveItem}
        />
      );
    }
  }

  WithActiveItem.propTypes = {
    changeActiveItem: PropTypes.func,
  };

  return WithActiveItem;
};

export default withActiveItem;
