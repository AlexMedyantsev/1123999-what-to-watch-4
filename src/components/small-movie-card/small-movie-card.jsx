import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from "../video-player/video-player.jsx";
import {VideoPreview} from "../../utils/consts.js";
import history from "../../history";
import {connect} from "react-redux";
import {getMovies} from "../../reducer/data/selectors.js";
import {ActionCreator} from "../../reducer/condition/condition.js";


class SmallMovieCard extends PureComponent {
  constructor(props) {
    super(props);

  }

  render() {
    const {movie, onMovieClick, isPlaying, handlerMouseEnter, handlerMouseLeave} = this.props;
    const {id} = movie;

    const onHandlerMovieClick = (event) => {
      onMovieClick(movie);
      event.preventDefault();
      history.push(`/films/${id}`);
    };

    return (
      <article className="small-movie-card catalog__movies-card" onClick={(event) => {
        onHandlerMovieClick(event);
      }}>
        <div className="small-movie-card__image"
          onMouseEnter={handlerMouseEnter}
          onMouseOut={handlerMouseLeave}
        >
          <VideoPlayer
            previewLink={movie.previewLink}
            poster={movie.image}
            isPlaying={isPlaying}
            isMuted={VideoPreview.IS_MUTED}
            width={VideoPreview.width}
            height={VideoPreview.height}
          />
        </div>
        <h3
          className="small-movie-card__title"
        >
          <a className="small-movie-card__link" href="movie-page.html">{movie.title}</a>
        </h3>
      </article>
    );
  }
}

SmallMovieCard.propTypes = {
  index: PropTypes.number.isRequired,
  movie: PropTypes.shape({
    image: PropTypes.string.isRequired,
    previewLink: PropTypes.string.isRequired,
    bgSrc: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    posterSrc: PropTypes.string.isRequired,
    ratingCount: PropTypes.number,
    ratingLevel: PropTypes.string,
    ratingScore: PropTypes.number,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    runTime: PropTypes.number.isRequired,
    id: PropTypes.number,
    isFavorite: PropTypes.boolean,
  }).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onMovieClick: PropTypes.func.isRequired,
  handlerMouseEnter: PropTypes.func.isRequired,
  handlerMouseLeave: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    movies: getMovies(state),
  };
};

const mapDispatchToProps = {
  onMovieClick: ActionCreator.setActiveMovie,
};


export default connect(mapStateToProps, mapDispatchToProps)(SmallMovieCard);
