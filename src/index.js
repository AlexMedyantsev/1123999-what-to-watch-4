import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import reducer from "./reducer/reducer.js";
import {createStore, applyMiddleware, compose} from 'redux';
import {Operation} from "./reducer/data/data.js";
import {Operation as UserOperation, ActionCreator, AuthorizationStatus} from "./reducer/user/user.js";
import App from "./components/app/app.jsx";
import thunk from 'redux-thunk';
import {createAPI} from "./api.js";

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const HeaderMovie = {
  TITLE: `Movie Title`,
  GENRE: `Drama`,
  YEAR: 2009,
};

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(Operation.loadMovies());
store.dispatch(UserOperation.checkAuth());

const init = () => {
  ReactDOM.render(
      <Provider store={store}>
        <App
          title={HeaderMovie.TITLE}
          genre={HeaderMovie.GENRE}
          year={HeaderMovie.YEAR}
        />,
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
