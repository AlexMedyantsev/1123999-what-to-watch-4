import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";
import movies from "../../mocks/movies.js";

describe(`MovieList snapshot`, () => {
  it(`Should movies list render correctly`, () => {
    const tree = renderer
      .create(<MoviesList
        movies={movies}
        onClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
