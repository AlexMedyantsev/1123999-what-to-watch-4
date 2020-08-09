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
import PrivateRoute from "../private-route/private-route.jsx";
import React, {PureComponent} from "react";
import SignIn from '../sign-in/sign-in.jsx';
import {Switch, Route, Router} from "react-router-dom";
import VideoPlayer from '../video-player/video-player.jsx';
import withVideoPlay from "../../hocs/with-video-play/with-video-play.js";

import {SIMILAR_MOVIES_COUNT} from "../../utils/consts.js";

const VideoPlayerWrapped = withVideoPlay(VideoPlayer);

class App extends PureComponent {
  constructor(props) {
    super(props);

  }

  renderMain() {
    const {movies, promoMovie} = this.props;
    return (
      <Main
        movies={movies}
        promoMovie={promoMovie}
      />
    );
  }

  renderMovieDetails(movies, props) {
    const movie = movies.find((movieItem)=> movieItem.id === +props.match.params.id);
    const similarMovies = getSimilarMoviesByGenres(movies, movie).slice(0, SIMILAR_MOVIES_COUNT);

    return (
      <MovieDetails
        movie={movie}
        similarMovies={similarMovies}
      />
    );
  }

  renderMyList(movies) {
    return (
      <MyList
        movies={movies}
      />
    );
  }

  renderLoginPage(onAuthSubmit) {
    return (
      <SignIn
        onSubmit={onAuthSubmit}
      />
    );
  }

  renderVideoPlayer(movie) {
    return (
      <VideoPlayerWrapped
        activeMovie={movie}
      />
    );
  }

  renderAddReview(props, activeMovie, onReviewSubmit) {
    return (
      <AddReview
        {...props}
        movie={activeMovie}
        activeMovieId={+props.match.params.id}
        onSubmit={onReviewSubmit}
      />
    );
  }


  render() {
    const {movies, onReviewSubmit, promoMovie, activeMovie, onAuthSubmit} = this.props;

    if (!movies || promoMovie === null || !movies.length) {
      return <div>...Loading. Wait a few seconds</div>;
    }

    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            {this.renderMain()}
          </Route>
          <Route exact path="/films/:id" render={(props) => (
            this.renderMovieDetails(movies, props)
          )}>
          </Route>
          <Route exact path="/login">
            {this.renderLoginPage(onAuthSubmit)}
          </Route>
          <Route exact path="/player/:id">
            {this.renderVideoPlayer(activeMovie)}
          </Route>
          <PrivateRoute exact path="/my-list">
            {this.renderMyList(movies)}
          </PrivateRoute>
          <PrivateRoute exact path="/films/:id/review" render={(props) => (
            this.renderAddReview(props, activeMovie, onReviewSubmit)
          )}>
          </PrivateRoute>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  movies: PropTypes.array.isRequired,
  onAuthSubmit: PropTypes.func.isRequired,
  activeMovie: PropTypes.object,
  promoMovie: PropTypes.object,
  onReviewSubmit: PropTypes.func.isRequired,
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
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
