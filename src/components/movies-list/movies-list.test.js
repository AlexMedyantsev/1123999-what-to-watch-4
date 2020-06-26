import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";
import films from "../../mocks/films.js";

describe(`MovieList snapshot`, () => {
  it(`Should movies list render correctly`, () => {
    const tree = renderer
      .create(<MoviesList
        films={films}
        onClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
