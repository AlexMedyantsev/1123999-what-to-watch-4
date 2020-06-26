import React from 'react';
import PropTypes from 'prop-types';

const SmallMovieCard = (props) => {
  const {image, name, index, onClick, onHover} = props;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => onHover(name)}
      onClick={() => onClick(index)}
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
        onClick={() => onClick(index)}
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
  onClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,
};

export default SmallMovieCard;
