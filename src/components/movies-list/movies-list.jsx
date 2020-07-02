import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import {PREVIEW_PLAY_DELAY} from "../../utils/consts.js";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null,
    };

    this.timerId = null;
  }

  render() {
    const {movies, onMovieCardClick} = this.props;

    return (
      movies.map((movie, index) =>
        <SmallMovieCard
          movie={movie}
          index={index}
          onMovieCardClick={onMovieCardClick}
          onMovieCardHover={(id) => {
            const timer = setTimeout(() => {
              this.setState({
                activeCard: id,
              });
            }, PREVIEW_PLAY_DELAY);

            this.timerId = timer;
          }}
          onMovieCardHoverLeave={() => {
            this.setState({
              activeCard: null,
            });
            clearTimeout(this.timerId);
          }}
          isPlaying={this.state.activeCard === movie.id}
          key={movie.id}
        />)
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
};

export default MoviesList;
