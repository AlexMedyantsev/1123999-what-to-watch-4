import React from 'react';
import PropTypes from 'prop-types';

const SmallMovieCard = (props) => {
  const {image, name, index, onMovieCardClick, onMovieCardHover} = props;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => onMovieCardHover(name)}
      onClick={(event) => onMovieCardClick(index, event)}
    >

      <div className="small-movie-card__image">
        <img
          src={image}
          alt={name}
          width="280"
          height="175"
        />
      </div>
      <h3
        className="small-movie-card__title"
        onClick={(event) => onMovieCardClick(index, event)}
      >
        <a className="small-movie-card__link" href="movie-page.html">{name}</a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onMovieCardHover: PropTypes.func.isRequired,
};

export default SmallMovieCard;
