import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import movies from "./mocks/movies.js";

const HeaderMovie = {
  TITLE: `Movie Title`,
  GENRE: `Drama`,
  YEAR: 2009,
};

ReactDOM.render(
    <App
      title={HeaderMovie.TITLE}
      genre={HeaderMovie.GENRE}
      year={HeaderMovie.YEAR}
      movies={movies}
    />,
    document.querySelector(`#root`)
);
