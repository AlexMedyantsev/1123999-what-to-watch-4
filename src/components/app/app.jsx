import React from "react";
import Main from "../main/main.jsx";

import films from "../../mocks/films.js";

const promoInfo = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
};

const App = () => {

  return (
    <Main
      headerMovieTitle={promoInfo.title}
      headerMovieGenre={promoInfo.genre}
      headerMovieYear={promoInfo.year}
      movies={films}
      OnTitleClick={() => {}}
    />
  );
};

export default App;
