import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import withVideoPlayer from "../../hocs/with-video-play/with-video-play.js";

const SmallMovieCardWrapped = withVideoPlayer(SmallMovieCard);

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {movies} = this.props;

    return (
      movies.map((movie, index) =>
        <SmallMovieCardWrapped
          movie={movie}
          index={index}
          key={movie.id + movie.title}
        />)
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  genre: state.genre,
  movie: state.movie,
});


export default connect(mapStateToProps)(MoviesList);
export {MoviesList};
