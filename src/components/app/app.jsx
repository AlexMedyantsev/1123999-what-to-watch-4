import React from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MovieDetails from "../movie-details/movie-details.jsx";
import Main from "../main/main.jsx";

import films from "../../mocks/films.js";

const promoInfo = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
};

const App = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main
            headerMovieTitle={promoInfo.title}
            headerMovieGenre={promoInfo.genre}
            headerMovieYear={promoInfo.year}
            movies={films}
            OnTitleClick={() => {}}
          />
        </Route>
        <Route exact path="/dev-film">
          <MovieDetails/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
