import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";


const App = (props) => {
  const {headerMovieTitle, headerMovieGenre, headerMovieYear, movies} = props;

  return (
    <Main
      headerMovieTitle={headerMovieTitle}
      headerMovieGenre={headerMovieGenre}
      headerMovieYear={headerMovieYear}
      movies={movies}
    />
  );
};

App.propTypes = {
  headerMovieTitle: PropTypes.string.isRequired,
  headerMovieGenre: PropTypes.string.isRequired,
  headerMovieYear: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default App;
