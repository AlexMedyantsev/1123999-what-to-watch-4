import React from "react";
import PropTypes from "prop-types";

const TabsOverview = (props) => {
  const {movie} = props;
  const {description, ratingScore, ratingLevel, ratingCount, director, starring} = movie;
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

TabsOverview.propTypes = {
  movie: PropTypes.shape({
    description: PropTypes.array.isRequired,
    ratingScore: PropTypes.number.isRequired,
    ratingLevel: PropTypes.string.isRequired,
    ratingCount: PropTypes.number.isRequired,
    director: PropTypes.array.isRequired,
    starring: PropTypes.array.isRequired,
  })
};

export default TabsOverview;
