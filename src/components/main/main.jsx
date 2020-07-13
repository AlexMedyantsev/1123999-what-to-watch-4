import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import {GENRES, MAX_NUMBER_GENRES} from "../../utils/consts.js";
import PropTypes from "prop-types";
import MoviesList from "../movies-list/movies-list.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";


class Main extends PureComponent {
  constructor(props) {
    super(props);

    this.handlerShowMoreButtonClick = this.handlerShowMoreButtonClick.bind(this);
    this.handlerSetCurrentGenre = this.handlerSetCurrentGenre.bind(this);
  }

  handlerShowMoreButtonClick() {
    this.props.onIncrementCountMoviesShow();
  }

  handlerSetCurrentGenre(genre) {
    const {onSetCurrentGenre, onresetCountMoviesShow} = this.props;

    onSetCurrentGenre(genre);
    onresetCountMoviesShow();
  }

  render() {
    const {title, genre, genresList, currentGenre, year, slicedMoviesByGenre, showMoreButton, onMovieCardClick} = this.props;

    return <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{year}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
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
            setCurrentGenre={this.handlerSetCurrentGenre}
          />

          <div className="catalog__movies-list">
            <MoviesList
              movies={slicedMoviesByGenre}
              onMovieCardClick={onMovieCardClick}
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
    </React.Fragment>;
  }
}

const mapStateToProps = (state) => {
  const moviesByGenre = state.movies.filter((movie) => {
    if (state.currentGenre === GENRES.ALL) {
      return true;
    }
    return movie.genres.includes(state.currentGenre);
  });

  const genres = new Set();
  genres.add(`All genres`);

  state.movies.forEach((movie) => {
    movie.genres.forEach((genre) => genres.has(genre) ? `` : genres.add(genre));
  });

  const genresList = Array.from(genres).slice(0, MAX_NUMBER_GENRES);

  const slicedMoviesByGenre = moviesByGenre.slice(0, state.countMoviesShow);
  const showMoreButton = moviesByGenre.length > state.countMoviesShow;

  return {
    currentGenre: state.currentGenre,
    genresList,
    slicedMoviesByGenre,
    showMoreButton,
  };
};

Main.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  currentGenre: PropTypes.string.isRequired,
  onSetCurrentGenre: PropTypes.func.isRequired,
  genresList: PropTypes.arrayOf(
      PropTypes.string.isRequired
  ).isRequired,
  onIncrementCountMoviesShow: PropTypes.func.isRequired,
  onresetCountMoviesShow: PropTypes.func.isRequired,
  slicedMoviesByGenre: PropTypes.array.isRequired,
  showMoreButton: PropTypes.bool.isRequired,
};

const mapDispatchToProps = {
  onSetCurrentGenre: ActionCreator.setCurrentGenre,
  onresetCountMoviesShow: ActionCreator.resetCountMoviesShow,
  onIncrementCountMoviesShow: ActionCreator.incrementCountMoviesShow
};

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
