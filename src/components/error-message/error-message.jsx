import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class ErrorMessage extends PureComponent {

  render() {
    const {errorMessage, isVisible} = this.props;

    return (
      isVisible ?
        <div className="error">
          <p className="error__text">Что-то пошло не так <br></br> Ошибка: {errorMessage}</p>
        </div>
        :
        ``
    );
  }
}

ErrorMessage.propTypes = {
  errorMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export {ErrorMessage};
