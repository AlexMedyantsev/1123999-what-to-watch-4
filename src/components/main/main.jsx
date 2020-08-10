import {AuthorizationStatus} from './../../reducer/user/user.js';
import {ActionCreator as ActionCreatorCondition} from "../../reducer/condition/condition.js";
import {connect} from "react-redux";
import GenresList from "../genres-list/genres-list.jsx";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {getCurrentGenre} from "../../reducer/condition/selectors.js";
import {getMoviesByGenre, getUniqueGenres, getShowedMoviesCount} from "../../reducer/condition/selectors.js";
import {Link} from "react-router-dom";
import MainLogo from "../main-logo/main-logo.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import {Operation as OperationData} from "../../reducer/data/data.js";
import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";


const MoviesListWrapped = withActiveItem(MoviesList);

class Main extends PureComponent {
  constructor(props) {
    super(props);

    this.handlerShowMoreButtonClick = this.handlerShowMoreButtonClick.bind(this);
    this.setCurrentGenreHandler = this.setCurrentGenreHandler.bind(this);
    this.myListButtonClickHandler = this.myListButtonClickHandler.bind(this);
  }

  handlerShowMoreButtonClick() {
    this.props.onIncrementCountMoviesShow();
  }

  setCurrentGenreHandler(genre) {
    const {onSetCurrentGenre, onresetCountMoviesShow} = this.props;

    onSetCurrentGenre(genre);
    onresetCountMoviesShow();
  }

  myListButtonClickHandler() {
    const {authorizationStatus, onFavoriteButtonClick, promoMovie} = this.props;
    if (authorizationStatus === AuthorizationStatus.AUTH) {
      onFavoriteButtonClick(promoMovie.id, !promoMovie.isFavorite);
    } else {
      history.push(`/login`);
    }
  }

  render() {
    const {genresList, currentGenre, authorizationStatus, promoMovie, slicedMoviesByGenre, showMoreButton} = this.props;
    const {bgSrc, genre, posterSrc, title, year, isFavorite, id} = promoMovie;


    return <React.Fragment>
      <div>
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src={bgSrc} alt={title}/>
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
                <img src={posterSrc} alt={title} width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <h2 className="movie-card__title">{title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{year}</span>
                </p>

                <div className="movie-card__buttons">
                  <Link to={`/player/${id}`} className="btn btn--play movie-card__button" type="button">
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0 0L19 9.5L0 19V0Z" fill="#EEE5B5"/>
                    </svg>
                    <span>Play</span>
                  </Link>
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
    runTime: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.string,
  })),
  promoMovie: PropTypes.shape({
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
    runTime: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.string,
  }).isRequired,
  onIncrementCountMoviesShow: PropTypes.func.isRequired,
  onresetCountMoviesShow: PropTypes.func.isRequired,
  slicedMoviesByGenre: PropTypes.array.isRequired,
  onFavoriteButtonClick: PropTypes.func.isRequired,
  showMoreButton: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const moviesByGenre = getMoviesByGenre(state);
  const genresList = getUniqueGenres(state);
  const slicedMoviesByGenre = moviesByGenre.slice(0, getShowedMoviesCount(state));
  const showMoreButton = moviesByGenre.length > getShowedMoviesCount(state);

  return {
    currentGenre: getCurrentGenre(state),
    authorizationStatus: getAuthorizationStatus(state),
    genresList,
    slicedMoviesByGenre,
    showMoreButton,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onSetCurrentGenre: (genre) => dispatch(ActionCreatorCondition.setCurrentGenre(genre)),
  onresetCountMoviesShow: () => dispatch(ActionCreatorCondition.resetCountMoviesShow()),
  onIncrementCountMoviesShow: () => dispatch(ActionCreatorCondition.incrementCountMoviesShow()),
  onFavoriteButtonClick: (id, status) => dispatch(OperationData.postFavoritePromoMovie(id, status)),
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
