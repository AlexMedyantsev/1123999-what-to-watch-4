import React, {PureComponent} from "react";
import {ActionCreator} from "../../reducer.js";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {MAX_NUMBER_GENRES} from "../../utils/consts.js";

class GenresList extends PureComponent {
  constructor(props) {
    super(props);

    this._getGenresList = this._getGenresList.bind(this);
  }

  _getGenresList() {
    const genres = new Set();

    genres.add(`All genres`);

    this.props.movies.forEach((movie) => {
      movie.genres.forEach((genre) => genres.has(genre) ? `` : genres.add(genre));
    });

    const genresList = Array.from(genres).slice(0, MAX_NUMBER_GENRES);
    return genresList;
  }

  render() {
    const {genre, onGenreClick} = this.props;
    const genresList = this._getGenresList();

    return (
      <ul className="catalog__genres-list">
        {genresList.map((genreItem) => {
          const activeClass = genre === genreItem ? `catalog__genres-item--active` : ``;

          return <li
            key={genreItem}
            className={`catalog__genres-item ${activeClass}`}
            onClick={(evt)=>{
              evt.preventDefault();
              onGenreClick(genreItem);
            }}
          >
            <a href="#" className="catalog__genres-link">{genreItem}</a>
          </li>;
        })}
      </ul>
    );
  }
}

GenresList.propTypes = {
  genre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        image: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
};

const mapStateToProps = (state) => ({
  genre: state.genre,
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre) {
    dispatch(ActionCreator.genreAction(genre));
  },
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
