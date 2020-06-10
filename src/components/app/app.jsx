import React from "react";
import Main from "../main/main.jsx";


const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {headerMovieTitle, headerMovieGenre, headerMovieYear} = props;

  return (
    <Main
      headerMovieTitle={headerMovieTitle}
      headerMovieGenre={headerMovieGenre}
      headerMovieYear={headerMovieYear}
    />
  );
};


export default App;
