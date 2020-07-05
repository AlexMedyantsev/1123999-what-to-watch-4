import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {MovieDetailsTabs} from "../../utils/consts.js";
import Tabs from "../tabs/tabs.jsx";
import movies from "../../mocks/movies.js";
import MoviesList from "../movies-list/movies-list.jsx";

const SIMILAR_FILMS_COUNT = 4;

// Получаем уникальные элементы из массива
const getUniqueArrayElements = (array) => {
  let result = [];

  array.forEach((item) => {
    if (!result.includes(item)) {
      result.push(item);
    }
  });

  return result;
};

// Получаем фильмы согласно фильтру
const getFilmsByFilter = (array, filterType) => array.filter((item) => item.genres.find((it) => it === filterType));

const getSimilarFilmsByGenre = (moviesArray, movie) => {
  const filmsByGenre = [];
  const similarFilms = movie.genres.map((genre) => [].concat(getFilmsByFilter(moviesArray, genre)));
  similarFilms.forEach((movieElement) => movieElement.forEach((it) => filmsByGenre.push(it)));
  const similarFilmsByGenre = filmsByGenre.filter((it) => it !== movie);

  return getUniqueArrayElements(similarFilmsByGenre);
};

class MovieDetails extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {activeTab: MovieDetailsTabs.OVERVIEW};

    this._handleTabClick = this._handleTabClick.bind(this);
  }

  _handleTabClick(tabName) {
    this.setState({
      activeTab: tabName,
    });
  }

  _renderTabs() {
    const {movie} = this.props;
    const {description, director, genres, ratingCount, ratingLevel, ratingScore, starring, year, runTime} = movie;
    switch (this.state.activeTab) {
      case MovieDetailsTabs.OVERVIEW:
        return (
          <Tabs
            tab={MovieDetailsTabs.OVERVIEW}
            onTabClick={this._handleTabClick}
          >
            <div className="movie-rating">
              <div className="movie-rating__score">{ratingScore}</div>
              <p className="movie-rating__meta">
                <span className="movie-rating__level">{ratingLevel}</span>
                <span className="movie-rating__count">{ratingCount} ratings</span>
              </p>
            </div>

            <div className="movie-card__text">
              {description.map((paragraph, index) => <p key={index}>{paragraph}</p>)}

              <p className="movie-card__director"><strong>Director: {director}</strong></p>

              <p className="movie-card__starring"><strong>Starring: {starring.map((star) => star).join(`, `)} and other</strong></p>
            </div>
          </Tabs>
        );
      case MovieDetailsTabs.DETAILS:
        return (
          <Tabs
            tab={MovieDetailsTabs.DETAILS}
            onTabClick={this._handleTabClick}
          >

            <div className="movie-card__text movie-card__row">
              <div className="movie-card__text-col">
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Director</strong>
                  <span className="movie-card__details-value">{director}</span>
                </p>
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Starring</strong>
                  <span className="movie-card__details-value">
                    {starring.map((star, index) => <React.Fragment key={index}>{star}<br /></React.Fragment>)}
                  </span>
                </p>
              </div>
              <div className="movie-card__text-col">
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Run Time</strong>
                  <span className="movie-card__details-value">{runTime}</span>
                </p>
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Genre</strong>
                  <span className="movie-card__details-value">{genres.map((genre, index) => <React.Fragment key={index}>{genre}<br /></React.Fragment>)}</span>
                </p>
                <p className="movie-card__details-item">
                  <strong className="movie-card__details-name">Released</strong>
                  <span className="movie-card__details-value">{year}</span>
                </p>
              </div>
            </div>
          </Tabs>
        );

      case MovieDetailsTabs.REVIEWS:
        return (
          <Tabs
            tab={MovieDetailsTabs.REVIEWS}
            onTabClick={this._handleTabClick}
          >
            <div className="movie-card__reviews movie-card__row">
              <div className="movie-card__reviews-col">
                <div className="review">
                  <blockquote className="review__quote">
                    <p className="review__text">Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director&apos;s funniest and most exquisitely designed movies in years.</p>

                    <footer className="review__details">
                      <cite className="review__author">Kate Muir</cite>
                      <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
                    </footer>
                  </blockquote>

                  <div className="review__rating">8,9</div>
                </div>

                <div className="review">
                  <blockquote className="review__quote">
                    <p className="review__text">Anderson&apos;s films are too precious for some, but for those of us willing to lose ourselves in them, they&apos;re a delight. &quot;The Grand Budapest Hotel&quot; is no different, except that he has added a hint of gravitas to the mix, improving the recipe.</p>

                    <footer className="review__details">
                      <cite className="review__author">Bill Goodykoontz</cite>
                      <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
                    </footer>
                  </blockquote>

                  <div className="review__rating">8,0</div>
                </div>

                <div className="review">
                  <blockquote className="review__quote">
                    <p className="review__text">I didn&apos;t find it amusing, and while I can appreciate the creativity, it&apos;s an hour and 40 minutes I wish I could take back.</p>

                    <footer className="review__details">
                      <cite className="review__author">Amanda Greever</cite>
                      <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
                    </footer>
                  </blockquote>

                  <div className="review__rating">8,0</div>
                </div>
              </div>
              <div className="movie-card__reviews-col">
                <div className="review">
                  <blockquote className="review__quote">
                    <p className="review__text">The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.</p>

                    <footer className="review__details">
                      <cite className="review__author">Matthew Lickona</cite>
                      <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                    </footer>
                  </blockquote>

                  <div className="review__rating">7,2</div>
                </div>

                <div className="review">
                  <blockquote className="review__quote">
                    <p className="review__text">It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.</p>

                    <footer className="review__details">
                      <cite className="review__author">Paula Fleri-Soler</cite>
                      <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                    </footer>
                  </blockquote>

                  <div className="review__rating">7,6</div>
                </div>

                <div className="review">
                  <blockquote className="review__quote">
                    <p className="review__text">It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.</p>

                    <footer className="review__details">
                      <cite className="review__author">Paula Fleri-Soler</cite>
                      <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                    </footer>
                  </blockquote>

                  <div className="review__rating">7,0</div>
                </div>
              </div>
            </div>
          </Tabs>
        );
    }
    return null;
  }

  render() {
    const {movie, onMovieCardClick} = this.props;
    const {backgroundImage, genres, image, title, year} = movie;
    const similarFilmsByGenre = getSimilarFilmsByGenre(movies, movie);

    return (
      <React.Fragment>
        <div className="visually-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"> <symbol id="add" viewBox="0 0 19 20">
            <title>+</title>
            <desc>Created with Sketch.</desc>
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <polygon id="+" fill="#EEE5B5" points="10.777832 11.2880859 10.777832 19.5527344 8.41650391 19.5527344 8.41650391 11.2880859 0.627929688 11.2880859 0.627929688 8.92675781 8.41650391 8.92675781 8.41650391 0.662109375 10.777832 0.662109375 10.777832 8.92675781 18.5664062 8.92675781 18.5664062 11.2880859" />
            </g>
          </symbol><symbol id="full-screen" viewBox="0 0 27 27">
            <path fillRule="evenodd" clipRule="evenodd" d="M23.8571 0H16V3.14286H23.8571V11H27V3.14286V0H23.8571Z" fill="#FFF9D9" fillOpacity="0.7" />
            <path fillRule="evenodd" clipRule="evenodd" d="M27 23.8571V16H23.8571V23.8571H16V27H23.8571H27L27 23.8571Z" fill="#FFF9D9" fillOpacity="0.7" />
            <path fillRule="evenodd" clipRule="evenodd" d="M0 3.14286L0 11H3.14286L3.14286 3.14286L11 3.14286V0H3.14286H0L0 3.14286Z" fill="#FFF9D9" fillOpacity="0.7" />
            <path fillRule="evenodd" clipRule="evenodd" d="M3.14286 27H11V23.8571H3.14286L3.14286 16H0L0 23.8571V27H3.14286Z" fill="#FFF9D9" fillOpacity="0.7" />
          </symbol><symbol id="in-list" viewBox="0 0 18 14">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.40513 5.35353L6.1818 8.90902L15.5807 0L18 2.80485L6.18935 14L0 8.17346L2.40513 5.35353Z" fill="#EEE5B5" />
          </symbol><symbol id="pause" viewBox="0 0 14 21">
            <title>Artboard</title>
            <desc>Created with Sketch.</desc>
            <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="0 -1.11910481e-13 4 -1.11910481e-13 4 21 0 21" />
              <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="10 -1.11910481e-13 14 -1.11910481e-13 14 21 10 21" />
            </g>
          </symbol></svg>
        </div >

        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={backgroundImage} alt={title} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <div className="logo">
                <a href="main.html" className="logo__link">
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
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genres.map((genre) => genre).join(`, `)}</span>
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
                  <a href="add-review.html" className="btn movie-card__button">Add review</a>
                </div>
              </div>
            </div>
          </div >

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={image} alt="The Grand Budapest Hotel poster" width="218" height="327" />
              </div>
              <div className="movie-card__desc">
                {this._renderTabs()}
              </div>
            </div>
          </div>
        </section >

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <div className="catalog__movies-list">
              <MoviesList
                movies={similarFilmsByGenre.slice(0, SIMILAR_FILMS_COUNT)}
                onMovieCardClick={onMovieCardClick}
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
  }
}


MovieDetails.propTypes = {
  movie: PropTypes.shape({
    backgroundImage: PropTypes.string,
    description: PropTypes.arrayOf(PropTypes.string),
    director: PropTypes.arrayOf(PropTypes.string),
    genres: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
    ratingCount: PropTypes.number,
    ratingLevel: PropTypes.string,
    ratingScore: PropTypes.number,
    starring: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    year: PropTypes.number,
    runTime: PropTypes.string
  }),
  onMovieCardClick: PropTypes.func.isRequired,
};

export default MovieDetails;
