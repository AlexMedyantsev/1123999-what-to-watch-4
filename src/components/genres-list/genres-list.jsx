import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {GENRES, MAX_NUMBER_GENRES} from "../../utils/consts.js";

export default class GenresList extends PureComponent {
  constructor(props) {
    super(props);

    this._getGenresList = this._getGenresList.bind(this);
  }

  _getGenresList() {
    const genres = new Set();

    genres.add(`All Movies`);

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
