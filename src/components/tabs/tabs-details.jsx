import React from "react";
import PropTypes from "prop-types";

const TabsDetails = (props) => {
  const {movie} = props;
  const {runTime, genres, year, director, starring} = movie;
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

TabsDetails.propTypes = {
  movie: PropTypes.shape({
    genres: PropTypes.array.isRequired,
    runTime: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    director: PropTypes.array.isRequired,
    starring: PropTypes.array.isRequired,
  })
};

export default TabsDetails;