import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import films from "./mocks/films.js";

const HeaderMovie = {
  TITLE: `Movie Title`,
  GENRE: `Drama`,
  YEAR: 2009,
};

ReactDOM.render(
    <App
      name={HeaderMovie.TITLE}
      genre={HeaderMovie.GENRE}
      year={HeaderMovie.YEAR}
      films={films}
    />,
    document.querySelector(`#root`)
);
