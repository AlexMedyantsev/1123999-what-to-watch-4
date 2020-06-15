import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const HeaderMovie = {
  TITLE: `Movie Title`,
  GENRE: `Drama`,
  YEAR: 2009,
};

const MOVIES = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Avatar`, `Aviator`, `Pulp fiction`];

ReactDOM.render(
    <App
      headerMovieTitle={HeaderMovie.TITLE}
      headerMovieGenre={HeaderMovie.GENRE}
      headerMovieYear={HeaderMovie.YEAR}
      movies={MOVIES}
    />,
    document.querySelector(`#root`)
);
