import React from "react";
import PropTypes from "prop-types";

const GenresList = (props) => {
  const {currentGenre, genresList, setCurrentGenre} = props;

  return (
    <ul className="catalog__genres-list">
      {genresList.map((genreItem) => {
        const activeClass = currentGenre === genreItem ? `catalog__genres-item--active` : ``;

        return <li
          key={genreItem}
          className={`catalog__genres-item ${activeClass}`}
          onClick={(evt)=>{
            evt.preventDefault();
            setCurrentGenre(genreItem);
          }}
        >
          <a href="#" className="catalog__genres-link">{genreItem}</a>
        </li>;
      })}
    </ul>
  );
};

GenresList.propTypes = {
  currentGenre: PropTypes.string,
  genresList: PropTypes.arrayOf(
      PropTypes.string.isRequired
  ).isRequired,
  setCurrentGenre: PropTypes.func,
};

export default GenresList;
