import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {activeCard: null};

    this._handleMovieCardMouseEnter = this._handleMovieCardMouseEnter.bind(this);
  }

  _handleMovieCardMouseEnter(movie) {
    this.setState({activeCard: movie});
  }

  render() {
    const {movies, onMovieCardClick} = this.props;

    return (
      movies.map((film, index) => (
        <SmallMovieCard
          image={film.image}
          name={film.title}
          index={index}
          onMovieCardClick={onMovieCardClick}
          onMovieCardHover={this._handleMovieCardMouseEnter}
          key={index}
        />
      ))
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
};

export default MoviesList;
