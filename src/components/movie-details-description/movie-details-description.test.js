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
  runTime: `01h30m`,
  link: `movie-page.html`,
  id: 1,
  backgroundColor: `background_color`,
  isFavorite: `is_favorite`
};

const comments = [
  {
    id: 1,
    user: {
      id: 13,
      name: `Zak`,
    },
    rating: 9,
    comment: `Unfortunately we don't have a reliable way to tell the true ratings of a movie.`,
    date: `2020-07-19T16:06:01.831Z`,
  }
];

describe(`MovieCardDescription render`, () => {
  it(`MovieCardDescription render`, () => {
    const handlerSetActive = jest.fn();
    const tree = renderer.create(
        <MovieDetailsDescription
          movie={movie}
          activeItem={`Overview`}
          setActiveItem={handlerSetActive}
          comments={comments}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
