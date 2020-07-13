import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import {PREVIEW_PLAY_DELAY} from "../../utils/consts.js";
import {GENRES} from "../../utils/consts.js";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null,
    };

    this.timerId = null;
  }

  _getFilteredMovies(genre, allMovies) {
    if (genre === GENRES.ALL) {
      return allMovies;
    }

    const filteredMovies = allMovies.filter((movie) => movie.genres.includes(genre));

    return filteredMovies;
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
          key={movie.id + movie.title}
        />)
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  genre: state.genre,
});


export default connect(mapStateToProps)(MoviesList);
export {MoviesList};
