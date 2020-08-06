import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {SERVER_ROUTE} from "../../utils/consts.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";

const PrivateRoute = (props) => {
  return (
    props.authorizationStatus === AuthorizationStatus.AUTH ? <Route {...props}/> : <Redirect to={SERVER_ROUTE.LOGIN}/>
  );
};

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    authorizationStatus: getAuthorizationStatus(state),
  };
};

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
