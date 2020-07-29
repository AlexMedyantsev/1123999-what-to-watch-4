import React from "react";
import renderer from "react-test-renderer";

import MovieDetailsDescription from './movie-details-description.jsx';


const movie = {
  image: `a`,
  posterSrc: `a`,
  bgSrc: `a`,
  title: `Name`,
  genre: `Genre`,
  year: 2014,
  score: 8.9,
  level: `level`,
  movieLink: `link`,
  previewLink: `preview-link`,
  scoresCount: 220,
  description: `description`,
  director: `director`,
  starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
  runTime: 22,
  link: `movie-page.html`,
  key: `1`,
  backgroundColor: `background_color`,
  isFavorite: `is_favorite`
}
  ;

describe(`MovieCardDescription render`, () => {
  it(`MovieCardDescription render`, () => {
    const handlerSetActive = jest.fn();
    const tree = renderer.create(
        <MovieDetailsDescription
          movie={movie}
          activeItem={`Overview`}
          setActiveItem={handlerSetActive}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
