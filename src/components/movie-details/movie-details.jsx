import {ActionCreator as ActionCreatorPlayer} from "../../reducer/player/player.js";
import {AuthorizationStatus} from './../../reducer/user/user.js';
import {connect} from "react-redux";
import {getVideoPlayerState} from "../../reducer/player/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {getComments} from "../../reducer/comments/selectors.js";
import history from "../../history.js";

import {Link} from "react-router-dom";
import MainLogo from "../main-logo/main-logo.jsx";
import {MovieDetailsTabs} from "../../utils/consts.js";
import MoviesList from "../movies-list/movies-list.jsx";
import MovieDetailsDescription from "../movie-details-description/movie-details-description.jsx";
import {Operation as OperationData} from "../../reducer/data/data.js";
import {Operation as OperationComment} from "../../reducer/comments/comments.js";

import PropTypes from "prop-types";
import React, {PureComponent} from "react";

import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import withVideoPlay from "../../hocs/with-video-play/with-video-play.js";
import VideoPlayer from "../video-player/video-player.jsx";


const MoviesListWrapped = withActiveItem(MoviesList);
const VideoPlayerWrapped = withVideoPlay(VideoPlayer);
const MoviesDetailsDescriptionWrapped = withActiveItem(MovieDetailsDescription, MovieDetailsTabs.OVERVIEW);

class MovieDetails extends PureComponent {
  constructor(props) {
    super(props);

    this.changeVideoPlayerStateHandler = this.changeVideoPlayerStateHandler.bind(this);
    this.myListButtonClickHandler = this.myListButtonClickHandler.bind(this);
  }

  changeVideoPlayerStateHandler() {
    this.props.onChangeVideoPlayerState();
  }

  myListButtonClickHandler() {
    const {authorizationStatus, onFavoriteButtonClick, movie} = this.props;
    if (authorizationStatus === AuthorizationStatus.AUTH) {
      onFavoriteButtonClick(movie.id, !movie.isFavorite);
    } else {
      history.push(`/login`);
    }
  }

  componentDidMount() {
    this.props.onLoadComments(this.props.movie.id);
  }

  render() {
    const {movie, similarMovies, isVideoPlayerOpened, authorizationStatus, comments} = this.props;
    const {bgSrc, genre, posterSrc, title, year, id, isFavorite, movieLink} = movie;

    return <React.Fragment>
      {isVideoPlayerOpened ?
        <VideoPlayerWrapped
          movieLink={movieLink}
          movieTitle={title}
        /> :
        <div>
          <section className="movie-card movie-card--full">
            <div className="movie-card__hero">
              <div className="movie-card__bg">
                <img src={bgSrc} alt={title} />
              </div>

              <h1 className="visually-hidden">WTW</h1>

              <header className="page-header movie-card__head">
                <MainLogo />

                {authorizationStatus === AuthorizationStatus.AUTH ?
                  <div className="user-block">
                    <div className="user-block__avatar">
                      <Link to="/my-list">
                        <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63" />
                      </Link>
                    </div>
                  </div>
                  : <div className="user-block">
                    <Link to="/login" className="user-block__link">Sign In</Link>
                  </div>
                }
              </header>

              <div className="movie-card__wrap">
                <div className="movie-card__desc">
                  <h2 className="movie-card__title">{title}</h2>
                  <p className="movie-card__meta">
                    <span className="movie-card__genre">{genre}</span>
                    <span className="movie-card__year">{year}</span>
                  </p>

                  <div className="movie-card__buttons">
                    <button className="btn btn--play movie-card__button" onClick={this.changeVideoPlayerStateHandler} type="button">
                      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0 0L19 9.5L0 19V0Z" fill="#EEE5B5"/>
                      </svg>
                      <span>Play</span>
                    </button>

                    <button className="btn btn--list movie-card__button" onClick={this.myListButtonClickHandler} type="button">
                      {isFavorite ?
                        <svg viewBox="0 0 18 14" width="18" height="14">
                          <use xlinkHref="#in-list"></use>
                        </svg> :
                        <svg viewBox="0 0 19 20" width="19" height="20">
                          <use xlinkHref="#add"></use>
                        </svg>
                      }
                      <span>My list</span>
                    </button>

                    {authorizationStatus === AuthorizationStatus.AUTH ?
                      <Link to={`/films/${id}/review`} className="btn movie-card__button">Add review</Link> :
                      <Link to={`/login`} className="btn movie-card__button">Add review</Link>
                    }
                  </div>
                </div>
              </div>
            </div >

            <div className="movie-card__wrap movie-card__translate-top">
              <div className="movie-card__info">
                <div className="movie-card__poster movie-card__poster--big">
                  <img src={posterSrc} alt="The Grand Budapest Hotel poster" width="218" height="327" />
                </div>
                <div className="movie-card__desc">
                  <MoviesDetailsDescriptionWrapped
                    movie={movie}
                    comments={comments}
                  />
                </div>
              </div>
            </div>
          </section >

          <div className="page-content">
            <section className="catalog catalog--like-this">
              <h2 className="catalog__title">More like this</h2>

              <div className="catalog__movies-list">
                <MoviesListWrapped
                  movies={similarMovies}
                />
              </div>
            </section>

            <footer className="page-footer">
              <div className="logo">
                <div className="logo__link logo__link--light">
                  <MainLogo />
                </div>
              </div>

              <div className="copyright">
                <p>© 2019 What to watch Ltd.</p>
              </div>
            </footer>
          </div>

        </div>
      }
    </React.Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    authorizationStatus: getAuthorizationStatus(state),
    isVideoPlayerOpened: getVideoPlayerState(state),
    comments: getComments(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onChangeVideoPlayerState: () => dispatch(ActionCreatorPlayer.changeVideoPlayerState()),
  onFavoriteButtonClick: (id, status) => dispatch(OperationData.postFavoriteMovie(id, status)),
  onLoadComments: (id) => dispatch(OperationComment.getComments(id)),
});


MovieDetails.propTypes = {
  authorizationStatus: PropTypes.string,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    bgSrc: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    posterSrc: PropTypes.string.isRequired,
    ratingCount: PropTypes.number,
    ratingLevel: PropTypes.string,
    ratingScore: PropTypes.number,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    movieLink: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    runTime: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isFavorite: PropTypes.boolean,
  }),
  comments: PropTypes.array.isRequired,
  similarMovies: PropTypes.array,
  isVideoPlayerOpened: PropTypes.bool.isRequired,
  onChangeVideoPlayerState: PropTypes.func.isRequired,
  onLoadComments: PropTypes.func.isRequired,
};

export {MovieDetails};
export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
