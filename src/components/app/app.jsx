import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MovieDetails from "../movie-details/movie-details.jsx";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import {SHOWING_MOVIES_COUNT} from "../../utils/consts.js";

const getUniqueArrayElements = (array) => {
  let result = [];

  array.forEach((item) => {
    if (!result.includes(item)) {
      result.push(item);
    }
  });

  return result;
};

const getFilmsByFilter = (array, filterType) => array.filter((item) => item.genres.find((it) => it === filterType));

const getSimilarFilmsByGenre = (moviesArray, movie) => {
  const filmsByGenre = [];
  const similarFilms = movie.genres.map((genre) => [].concat(getFilmsByFilter(moviesArray, genre)));
  similarFilms.forEach((movieElement) => movieElement.forEach((it) => filmsByGenre.push(it)));
  const similarFilmsByGenre = filmsByGenre.filter((it) => it !== movie);

  return getUniqueArrayElements(similarFilmsByGenre);
};

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      movieIndex: null,
    };

    this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
  }

  _handleMovieCardClick(index, event) {
    event.preventDefault();
    this.setState({
      movieIndex: index,
    });
  }

  _renderApp() {
    const {title, genre, year, movies} = this.props;
    const {movieIndex} = this.state;

    if (movieIndex < 0 || movieIndex === null) {
      return (
        <Main
          title={title}
          genre={genre}
          year={year}
          movies={movies}
          onMovieCardClick={this._handleMovieCardClick}
        />
      );
    }

    const similarMovies = getSimilarFilmsByGenre(movies, movies[movieIndex]).slice(0, SHOWING_MOVIES_COUNT);

    return (
      <MovieDetails
        movie={movies[movieIndex]}
        similarMovies={similarMovies}
        onMovieCardClick={this._handleMovieCardClick}
      />
    );
  }

  render() {
    const {movies} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film-details">
            <MovieDetails
              movie={movies[0]}
              onMovieCardClick={this._handleMovieCardClick}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  movies: PropTypes.array.isRequired,
};

export default App;
