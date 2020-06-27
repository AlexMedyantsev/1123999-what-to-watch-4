import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MovieDetails from "../movie-details/movie-details.jsx";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";


class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      filmIndex: null,
    };

    this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
  }

  _handleMovieCardClick(index) {
    this.setState({
      filmIndex: index,
    });
  }

  _renderApp() {
    const {name, genre, year, movies} = this.props;
    const {filmIndex} = this.state;

    if (filmIndex < 0 || filmIndex === null) {
      return (
        <Main
          name={name}
          genre={genre}
          year={year}
          movies={movies}
          onMovieCardClick={this._handleMovieCardClick}
        />
      );
    }

    return (
      <MovieDetails
        film={movies[filmIndex]}
      />
    );
  }

  render() {
    const {movies} = this.props;
    const film = movies[0];

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film-details">
            <MovieDetails
              backgroundImage={film.backgroundImage}
              description={film.description}
              director={film.director}
              genres={film.genres}
              ratingCount={film.ratingCount}
              ratingLevel={film.ratingLevel}
              ratingScore={film.ratingScore}
              starring={film.starring}
              name={film.title}
              year={film.year}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  name: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  movies: PropTypes.array.isRequired,
};

export default App;
