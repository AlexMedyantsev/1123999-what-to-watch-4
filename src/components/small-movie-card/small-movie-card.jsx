import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from "../video-player/video-player.jsx";
import {VideoPreview} from "../../utils/consts.js";


class SmallMovieCard extends PureComponent {
  constructor(props) {
    super(props);

  }

  render() {
    const {index, movie, onMovieCardClick, isPlaying, onMovieCardHover, onMovieCardHoverLeave} = this.props;
    const {image, preview, title, id} = movie;

    return (
      <article className="small-movie-card catalog__movies-card">
        <div className="small-movie-card__image"
          onClick={(event) => onMovieCardClick(index, event)}
          onMouseEnter={() => {
            onMovieCardHover(id);
          }}
          onMouseOut={onMovieCardHoverLeave}
        >
          <VideoPlayer
            source={preview}
            poster={image}
            isPlaying={isPlaying}
            isMuted={VideoPreview.IS_MUTED}
            width={VideoPreview.width}
            height={VideoPreview.height}
          />
        </div>
        <h3
          className="small-movie-card__title"
          onClick={(event) => onMovieCardClick(index, event)}
        >
          <a className="small-movie-card__link" href="movie-page.html">{title}</a>
        </h3>
      </article>
    );
  }
}

SmallMovieCard.propTypes = {
  index: PropTypes.number.isRequired,
  movie: PropTypes.shape({
    image: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onMovieCardHover: PropTypes.func.isRequired,
  onMovieCardHoverLeave: PropTypes.func.isRequired,
};

export default SmallMovieCard;
