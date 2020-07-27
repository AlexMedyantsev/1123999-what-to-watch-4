import {extend} from "../../utils/common.js";

const AuthorizationStatus = {
  NO_AUTH: `NO_AUTH`,
  AUTH: `AUTH`
};

const SERVER_ROUTE = {
  login: `/login`
};

const initialState = {
  authorizationStatus: AuthorizationStatus.AUTH,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload,
      });
  }
  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(SERVER_ROUTE.login)
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(SERVER_ROUTE.login, {
      email: authData.login,
      password: authData.password,
    })
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      });
  },
};

export {
  ActionCreator,
  ActionType,
  AuthorizationStatus,
  Operation,
  reducer,
};