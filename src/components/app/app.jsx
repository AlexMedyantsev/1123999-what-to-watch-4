import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MovieDetails from "../movie-details/movie-details.jsx";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";


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

    return (
      <MovieDetails
        movie={movies[movieIndex]}
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
