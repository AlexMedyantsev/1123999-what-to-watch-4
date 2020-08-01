import React, {PureComponent} from "react";
import {Switch, Route, Router} from "react-router-dom";
import MovieDetails from "../movie-details/movie-details.jsx";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import {connect} from "react-redux";
import history from "../../history.js";
import {getMovies} from "../../reducer/data/selectors.js";
import {getActiveMovie} from "../../reducer/condition/selectors.js";
import {SIMILAR_MOVIES_COUNT} from "../../utils/consts.js";
import {getSimilarMoviesByGenres} from "../../utils/common.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";


import SignIn from '../sign-in/sign-in.jsx';
import AddReview from '../add-review/add-review.jsx';
import MyList from '../my-list/my-list.jsx';


class App extends PureComponent {
  constructor(props) {
    super(props);

  }

  renderMain(movies) {
    if (!movies || !movies.length) {
      return (<div></div>);
    } else {
      return (
        <Main
          movies={movies}
        />
      );
    }
  }

  renderMyList(movies) {
    if (!movies || !movies.length) {
      return (<div></div>);
    } else {
      return (
        <MyList
          movies={movies}
        />
      );
    }
  }


  render() {
    const {movies, onReviewSubmit, activeMovie, onAuthSubmit} = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            {this.renderMain(movies)}
          </Route>
          <Route exact path="/films/:id" render={(props) => {
            if (!movies || !movies.length) {
              return (<div></div>);
            } else {
              const movie = movies.find((movieItem)=> +movieItem.id === +props.match.params.id);
              const similarMovies = getSimilarMoviesByGenres(movies, movie).slice(0, SIMILAR_MOVIES_COUNT);
              return (
                <MovieDetails
                  movie={movie}
                  similarMovies={similarMovies}
                />
              );
            }
          }}>
          </Route>
          <Route exact path="/login">
            <SignIn
              onSubmit={onAuthSubmit}
            />
          </Route>
          <Route exact path="/my-list">
            {this.renderMyList(movies)}
          </Route>
          <Route exact path="/films/:id/review" render={(props) => {
            if (!movies || !movies.length) {
              return (<div></div>);
            } else {
              return (
                <AddReview
                  {...props}
                  movie={movies[activeMovie - 1]}
                  activeMovieId={+props.match.params.id}
                  onSubmit={onReviewSubmit}
                />
              );
            }
          }}>

          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  movies: PropTypes.array.isRequired,
  onAuthSubmit: PropTypes.func.isRequired,
  activeMovie: PropTypes.number.isRequired,
  onReviewSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    movies: getMovies(state),
    activeMovie: getActiveMovie(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onMovieClick: DataActionCreator.setActiveMovie,
    onAuthSubmit: (authData) => {
      dispatch(UserOperation.login(authData));
    },
    onReviewSubmit: (reviewData, movieId) => {
      dispatch(UserOperation.postComment(reviewData, movieId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
