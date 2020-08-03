import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {ActionCreator as ActionCreatorCondition} from "../../reducer/condition/condition.js";
import {ActionCreator as ActionCreatorPlayer} from "../../reducer/player/player.js";
import {getMoviesByGenre, getUniqueGenres, getShowedMoviesCount} from "../../reducer/condition/selectors.js";
import {getVideoPlayerState} from "../../reducer/player/selectors.js";
import PropTypes from "prop-types";
import MoviesList from "../movies-list/movies-list.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";
import {AuthorizationStatus} from './../../reducer/user/user.js';
import {Link} from "react-router-dom";
import MainLogo from "../main-logo/main-logo.jsx";
import VideoPlayer from "../video-player/video-player.jsx";


const MoviesListWrapped = withActiveItem(MoviesList);

class Main extends PureComponent {
  constructor(props) {
    super(props);

    this.handlerShowMoreButtonClick = this.handlerShowMoreButtonClick.bind(this);
    this.setCurrentGenreHandler = this.setCurrentGenreHandler.bind(this);
    this.changeVideoPlayerStateHandler = this.changeVideoPlayerStateHandler.bind(this);
  }

  handlerShowMoreButtonClick() {
    this.props.onIncrementCountMoviesShow();
  }

  changeVideoPlayerStateHandler() {
    this.props.onChangeVideoPlayerState();
  }

  setCurrentGenreHandler(genre) {
    const {onSetCurrentGenre, onresetCountMoviesShow} = this.props;

    onSetCurrentGenre(genre);
    onresetCountMoviesShow();
  }

  render() {
    const {genresList, currentGenre, authorizationStatus, isVideoPlayerOpened, promoMovie, slicedMoviesByGenre, showMoreButton} = this.props;

    return <React.Fragment>
      {isVideoPlayerOpened ?
        <VideoPlayer
          movieLink={promoMovie.movieLink}
        /> :
        <div>
          <section className="movie-card">
            <div className="movie-card__bg">
              <img src={promoMovie.bgSrc} alt={promoMovie.title}/>
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <MainLogo />
              {authorizationStatus === AuthorizationStatus.AUTH ?
                <div className="user-block">
                  <div className="user-block__avatar">
                    <Link to="/my-list">
                      <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                    </Link>
                  </div>
                </div>
                : <div className="user-block">
                  <Link to="/login" className="user-block__link">Sign In</Link>
                </div>
              }

            </header>

            <div className="movie-card__wrap">
              <div className="movie-card__info">
                <div className="movie-card__poster">
                  <img src={promoMovie.posterSrc} alt={promoMovie.title} width="218" height="327" />
                </div>

                <div className="movie-card__desc">
                  <h2 className="movie-card__title">{promoMovie.title}</h2>
                  <p className="movie-card__meta">
                    <span className="movie-card__genre">{promoMovie.genre}</span>
                    <span className="movie-card__year">{promoMovie.title}</span>
                  </p>

                  <div className="movie-card__buttons">
                    <button className="btn btn--play movie-card__button" onClick={this.changeVideoPlayerStateHandler} type="button">
                      <svg viewBox="0 0 19 19" width="19" height="19">
                        <use xlinkHref="#play-s"></use>
                      </svg>
                      <span>Play</span>
                    </button>
                    <button className="btn btn--list movie-card__button" type="button">
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"></use>
                      </svg>
                      <span>My list</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="page-content">
            <section className="catalog">
              <h2 className="catalog__title visually-hidden">Catalog</h2>

              <GenresList
                genresList={genresList}
                currentGenre={currentGenre}
                setCurrentGenre={this.setCurrentGenreHandler}
              />

              <div className="catalog__movies-list">
                <MoviesListWrapped
                  movies={slicedMoviesByGenre}
                />
              </div>

              {showMoreButton ?
                <ShowMoreButton
                  onButtonClick={this.handlerShowMoreButtonClick}
                /> : ``}

            </section>

            <footer className="page-footer">
              <div className="logo">
                <a className="logo__link logo__link--light">
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </a>
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
Main.propTypes = {
  currentGenre: PropTypes.string,
  onSetCurrentGenre: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string,
  genresList: PropTypes.arrayOf(
      PropTypes.string.isRequired
  ),
  movies: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    posterSrc: PropTypes.string.isRequired,
    bgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    level: PropTypes.string.isRequired,
    movieLink: PropTypes.string.isRequired,
    previewLink: PropTypes.string.isRequired,
    scoresCount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.array.isRequired,
    runTime: PropTypes.number.isRequired,
    link: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.string,
  })),
  promoMovie: PropTypes.object.isRequired,
  isVideoPlayerOpened: PropTypes.bool.isRequired,
  onIncrementCountMoviesShow: PropTypes.func.isRequired,
  onChangeVideoPlayerState: PropTypes.func.isRequired,
  onresetCountMoviesShow: PropTypes.func.isRequired,
  slicedMoviesByGenre: PropTypes.array.isRequired,
  showMoreButton: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const moviesByGenre = getMoviesByGenre(state);
  const genresList = getUniqueGenres(state);
  const slicedMoviesByGenre = moviesByGenre.slice(0, getShowedMoviesCount(state));
  const showMoreButton = moviesByGenre.length > getShowedMoviesCount(state);

  return {
    // Добавить селекторы или неймспейс
    currentGenre: state.CONDITION.currentGenre,
    authorizationStatus: state.USER.authorizationStatus,
    isVideoPlayerOpened: getVideoPlayerState(state),
    genresList,
    slicedMoviesByGenre,
    showMoreButton,
  };
};

const mapDispatchToProps = {
  onSetCurrentGenre: ActionCreatorCondition.setCurrentGenre,
  onresetCountMoviesShow: ActionCreatorCondition.resetCountMoviesShow,
  onChangeVideoPlayerState: ActionCreatorPlayer.changeVideoPlayerState,
  onIncrementCountMoviesShow: ActionCreatorCondition.incrementCountMoviesShow,
};

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
