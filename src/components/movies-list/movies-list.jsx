import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import withPreviewVideoPlayer from "../../hocs/with-preview-video-play/with-preview-video-play.js";

const SmallMovieCardWrapped = withPreviewVideoPlayer(SmallMovieCard);

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
