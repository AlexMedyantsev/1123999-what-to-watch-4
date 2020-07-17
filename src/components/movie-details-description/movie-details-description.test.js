import React from "react";
import renderer from "react-test-renderer";

import MovieDetailsDescription from './movie-details-description.jsx';

import movies from "../../mocks/movies.js";

describe(`MovieCardDescription render`, () => {
  it(`MovieCardDescription render`, () => {
    const handlerSetActive = jest.fn();
    const tree = renderer.create(
        <MovieDetailsDescription
          movie={movies[0]}
          activeItem={`Overview`}
          setActiveItem={handlerSetActive}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
