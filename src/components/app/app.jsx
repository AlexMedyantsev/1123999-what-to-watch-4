import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MovieDetails from "../movie-details/movie-details.jsx";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import {connect} from "react-redux";
import {getMovies} from "../../reducer/data/selectors.js";
import {SIMILAR_MOVIES_COUNT} from "../../utils/consts.js";
import {getSimilarMoviesByGenres} from "../../utils/common.js";

import AuthScreen from './../auth-screen/auth-screen.jsx';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeMovie: null,
    };

    this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
  }

  _handleMovieCardClick(movie) {
    this.setState({
      activeMovie: movie,
    });
  }

  _renderApp() {
    const {title, genre, year, movies} = this.props;
    const {activeMovie} = this.state;


    if (!movies || !movies.length) {
      return (<div></div>);
    }

    if (activeMovie < 0 || activeMovie === null) {
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

    const similarMovies = getSimilarMoviesByGenres(movies, this.state.activeMovie).slice(0, SIMILAR_MOVIES_COUNT);

    return (
      <MovieDetails
        movie={this.state.activeMovie}
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
          <Route exact path="/dev-sign">
            <AuthScreen
              onSubmit={() => {}}
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

const mapStateToProps = (state) => {
  return {movies: getMovies(state)};
};

export default connect(mapStateToProps)(App);
