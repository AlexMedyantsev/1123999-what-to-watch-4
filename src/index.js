import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const HeaderMovie = {
  TITLE: `Movie Title`,
  GENRE: `Drama`,
  YEAR: `2009`,
};

ReactDOM.render(
    <App
      headerMovieTitle={HeaderMovie.TITLE}
      headerMovieGenre={HeaderMovie.GENRE}
      headerMovieYear={HeaderMovie.YEAR}
    />,
    document.querySelector(`#root`)
);
