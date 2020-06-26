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
    const {films, onClick} = this.props;

    return (
      films.map((film, index) => (
        <SmallMovieCard
          image={film.image}
          name={film.title}
          index={index}
          onClick={onClick}
          onHover={this._handleMovieCardMouseEnter}
          key={index}
        />
      ))
    );
  }
}

MoviesList.propTypes = {
  films: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MoviesList;
