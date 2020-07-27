import React from "react";
import PropTypes from "prop-types";

const TabsOverview = (props) => {
  const {movie} = props;
  const {description, score, level, scoresCount, director, starring} = movie;
  return (
    <React.Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{score}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{level}</span>
          <span className="movie-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        {description}

        <p className="movie-card__director"><strong>Director: {director}</strong></p>

        <p className="movie-card__starring"><strong>Starring: {starring.map((star) => star).join(`, `)} and other</strong></p>
      </div>
    </React.Fragment>
  );
};

TabsOverview.propTypes = {
  movie: PropTypes.shape({
    description: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    level: PropTypes.string.isRequired,
    scoresCount: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.array.isRequired,
  })
};

export default TabsOverview;
