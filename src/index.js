import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer, ActionCreator} from "./reducer.js";
import App from "./components/app/app.jsx";
import movies from "./mocks/movies.js";

const HeaderMovie = {
  TITLE: `Movie Title`,
  GENRE: `Drama`,
  YEAR: 2009,
};

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

store.dispatch(ActionCreator.setMovies(movies));

ReactDOM.render(
    <Provider store={store}>
      <App
        title={HeaderMovie.TITLE}
        genre={HeaderMovie.GENRE}
        year={HeaderMovie.YEAR}
        movies={movies}
      />,
    </Provider>,
    document.querySelector(`#root`)
);
