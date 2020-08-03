import {ActionCreator} from "../../reducer/player/player.js";
import AddReview from '../add-review/add-review.jsx';
import {connect} from "react-redux";
import {getSimilarMoviesByGenres} from "../../utils/common.js";
import {getMovies, getPromoMovie} from "../../reducer/data/selectors.js";
import {getActiveMovie} from "../../reducer/condition/selectors.js";
import history from "../../history.js";
import Main from "../main/main.jsx";
import MovieDetails from "../movie-details/movie-details.jsx";
import MyList from '../my-list/my-list.jsx';
import {Operation as UserOperation} from "../../reducer/user/user.js";

import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import SignIn from '../sign-in/sign-in.jsx';
import {Switch, Route, Router} from "react-router-dom";

import {SIMILAR_MOVIES_COUNT} from "../../utils/consts.js";


class App extends PureComponent {
  constructor(props) {
    super(props);

  }

  renderMain() {
    const {movies, promoMovie} = this.props;

    if (!movies || promoMovie === null || !movies.length) {
      return (<div></div>);
    } else {
      return (
        <Main
          movies={movies}
          promoMovie={promoMovie}
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
    const {movies, onReviewSubmit, activeMovie, onAuthSubmit, onChangeVideoPlayerState} = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            {this.renderMain()}
          </Route>
          <Route exact path="/films/:id" render={(props) => {
            if (!movies || !movies.length) {
              return (<div></div>);
            } else {
              const movie = movies.find((movieItem)=> movieItem.id === +props.match.params.id);
              const similarMovies = getSimilarMoviesByGenres(movies, movie).slice(0, SIMILAR_MOVIES_COUNT);
              return (
                <MovieDetails
                  movie={movie}
                  onChangeVideoPlayerState={onChangeVideoPlayerState}
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
                  movie={activeMovie}
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
  activeMovie: PropTypes.object.isRequired,
  promoMovie: PropTypes.object.isRequired,
  onReviewSubmit: PropTypes.func.isRequired,
  onChangeVideoPlayerState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    movies: getMovies(state),
    promoMovie: getPromoMovie(state),
    activeMovie: getActiveMovie(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  onAuthSubmit: (authData) =>
    dispatch(UserOperation.login(authData)),
  onReviewSubmit: (reviewData, movieId) =>
    dispatch(UserOperation.postComment(reviewData, movieId)),
  onChangeVideoPlayerState: ActionCreator.changeVideoPlayerState,
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
