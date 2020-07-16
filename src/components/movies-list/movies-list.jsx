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
    const {movies, setActiveItem} = this.props;

    return (
      movies.map((movie, index) =>
        <SmallMovieCardWrapped
          movie={movie}
          index={index}
          onMovieCardClick={setActiveItem}
          key={movie.id + movie.title}
        />)
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  setActiveItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  genre: state.genre,
});


export default connect(mapStateToProps)(MoviesList);
export {MoviesList};
