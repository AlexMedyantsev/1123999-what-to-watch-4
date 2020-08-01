import React from "react";
import PropTypes from "prop-types";
import {MovieDetailsTabs} from "../../utils/consts.js";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import MoviesList from "../movies-list/movies-list.jsx";
import MovieDetailsDescription from "../movie-details-description/movie-details-description.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import {AuthorizationStatus} from './../../reducer/user/user.js';
import MainLogo from "../main-logo/main-logo.jsx";
import {Operation} from "../../reducer/data/data.js";


const MoviesListWrapped = withActiveItem(MoviesList);
const MoviesDetailsDescriptionWrapped = withActiveItem(MovieDetailsDescription, MovieDetailsTabs.OVERVIEW);

const MovieDetails = (props) => {
  const {movie, similarMovies, authorizationStatus, onFavoriteButtonClick} = props;
  const {bgSrc, genre, posterSrc, title, year, id, isFavorite} = movie;

  const myListButtonClickhandler = () => {
    if (authorizationStatus === AuthorizationStatus.AUTH) {
      onFavoriteButtonClick(id, !isFavorite);
    } else {
      history.push(`/login`);
    }
  };

  return (
    <React.Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={bgSrc} alt={title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <MainLogo />

            <div className="user-block">
              <div className="user-block__avatar">
                <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </div>
          </header>

          <div className="movie-card__wrap">
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
                <button className="btn btn--list movie-card__button" onClick={myListButtonClickhandler} type="button">
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
                  ``
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
            <a href="main.html" className="logo__link logo__link--light">
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
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    // Добавить селекторы или неймспейс
    authorizationStatus: state.USER.authorizationStatus,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFavoriteButtonClick: (id, status) => dispatch(Operation.postFavoriteMovie(id, status)),
  };
};

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
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    runTime: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    isFavorite: PropTypes.boolean,
  }),
  similarMovies: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
