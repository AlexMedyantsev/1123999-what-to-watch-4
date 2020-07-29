import React, {PureComponent} from "react";
import {Switch, Route, Router} from "react-router-dom";
import MovieDetails from "../movie-details/movie-details.jsx";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import {connect} from "react-redux";
import history from "../../history.js";
import {getMovies} from "../../reducer/data/selectors.js";
import {SIMILAR_MOVIES_COUNT} from "../../utils/consts.js";
import {getSimilarMoviesByGenres} from "../../utils/common.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";

import SignIn from '../sign-in/sign-in.jsx';

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
    const {movies} = this.props;
    const {activeMovie} = this.state;


    if (!movies || !movies.length) {
      return (<div></div>);
    }

    if (activeMovie < 0 || activeMovie === null) {
      return (
        <Main
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
    const {movies, onSubmit} = this.props;

    return (
      <Router history={history}>
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
          <Route exact path="/login">
            <SignIn
              onSubmit={onSubmit}
            />
          </Route>
          <Route exact path="/dev-review">
            <SignIn
              onSubmit={onSubmit}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  movies: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {movies: getMovies(state)};
};

const mapDispatchToProps = (dispatch) => {
  return {onSubmit: (authData) => {
    dispatch(UserOperation.login(authData));
  }};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
