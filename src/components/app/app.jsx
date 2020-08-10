import AddReview from '../add-review/add-review.jsx';
import {connect} from "react-redux";
import {ErrorMessage} from "../error-message/error-message.jsx";
import {getSimilarMoviesByGenres} from "../../utils/common.js";
import {getMovies, getPromoMovie} from "../../reducer/data/selectors.js";
import {getErrorMessage} from "../../reducer/condition/selectors.js";
import {getActiveMovie} from "../../reducer/condition/selectors.js";
import history from "../../history.js";
import Main from "../main/main.jsx";
import MovieDetails from "../movie-details/movie-details.jsx";
import MyList from '../my-list/my-list.jsx';
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {Operation as CommentOperation} from "../../reducer/comments/comments.js";

import PropTypes from "prop-types";
import PrivateRoute from "../private-route/private-route.jsx";
import React, {PureComponent} from "react";
import SignIn from '../sign-in/sign-in.jsx';
import {Switch, Route, Router} from "react-router-dom";
import {VideoPlayer} from '../video-player/video-player.jsx';
import withVideoPlay from "../../hocs/with-video-play/with-video-play.js";
import {withPopupMessage} from "../../hocs/with-popup-message/with-popup-message.js";

import {SIMILAR_MOVIES_COUNT} from "../../utils/consts.js";
import {getElementFromArrayById} from "../../utils/common.js";
import {getErrorStatus} from "../../reducer/condition/selectors";

const VideoPlayerWrapped = withVideoPlay(VideoPlayer);
const ErrorMessageWrapped = withPopupMessage(ErrorMessage);

class App extends PureComponent {
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

  renderVideoPlayer(movies, props) {
    return (
      <VideoPlayerWrapped
        activeMovie={getElementFromArrayById(movies, +props.match.params.id)}
      />
    );
  }

  renderAddReview(props, movies, onReviewSubmit) {
    return (
      <AddReview
        {...props}
        activeMovie={getElementFromArrayById(movies, +props.match.params.id)}
        onSubmit={onReviewSubmit}
      />
    );
  }


  render() {
    const {movies, onReviewSubmit, promoMovie, onAuthSubmit, errorMessage, isError} = this.props;

    if (!movies || promoMovie === null || !movies.length) {
      return <div>...Loading. Wait a few seconds</div>;
    }

    return (
      <>
      {isError ? <ErrorMessageWrapped errorMessage={errorMessage}/> : ``}
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
          <Route exact path="/player/:id" render={(props) => (
            this.renderVideoPlayer(movies, props)
          )}>
          </Route>
          <PrivateRoute exact path="/my-list">
            {this.renderMyList(movies)}
          </PrivateRoute>
          <PrivateRoute exact path="/films/:id/review" render={(props) => (
            this.renderAddReview(props, movies, onReviewSubmit)
          )}>
          </PrivateRoute>
        </Switch>
      </Router>
      </>
    );
  }
}

App.propTypes = {
  movies: PropTypes.array.isRequired,
  onAuthSubmit: PropTypes.func.isRequired,
  activeMovie: PropTypes.object,
  promoMovie: PropTypes.object,
  onReviewSubmit: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    movies: getMovies(state),
    promoMovie: getPromoMovie(state),
    activeMovie: getActiveMovie(state),
    isError: getErrorStatus(state),
    errorMessage: getErrorMessage(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onAuthSubmit: (authData) =>
    dispatch(UserOperation.login(authData)),
  onReviewSubmit: (reviewData, movieId, callback) =>
    dispatch(CommentOperation.postComment(reviewData, movieId, callback)),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
