import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import reducer from "./reducer/reducer.js";
import {createStore, applyMiddleware, compose} from 'redux';
import {Operation} from "./reducer/data/data.js";
import {ActionCreator as ActionCreatorCondition} from "./reducer/condition/condition.js";
import {Operation as UserOperation, ActionCreator as ActionCreatorUser} from "./reducer/user/user.js";
import App from "./components/app/app.jsx";
import {AuthorizationStatus} from "./reducer/user/user.js";
import thunk from 'redux-thunk';
import {createAPI} from "./api.js";
import history from "./history.js";


const onError = (responce) => {
  store.dispatch(ActionCreatorCondition.setErrorMessage(responce));
  store.dispatch(ActionCreatorCondition.changeErrorFlag());
};

const onUnauthorized = (error) => {
  store.dispatch(ActionCreatorUser.requireAuthorization(AuthorizationStatus.NO_AUTH));
  if (error.config.url !== `/login`) {
    history.push(`/login`);
  }
};

const api = createAPI(onError, onUnauthorized);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(Operation.loadMovies());
store.dispatch(Operation.loadPromoMovie());
store.dispatch(Operation.loadFavoriteMovies());
store.dispatch(UserOperation.checkAuth());

const init = () => {
  ReactDOM.render(
      <Provider store={store}>
        <App
        />
      </Provider>,
      document.querySelector(`#root`)
  );
};


init();
