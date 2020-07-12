import React from "react";
import renderer from "react-test-renderer";

import {GenresList} from "./genres-list.jsx";

import {GENRES} from "../../utils/consts.js";
import movies from "../../mocks/movies.js";


describe(`Main Snapshot`, () => {
  it(`Should GenresList render correctly`, () => {
    const tree = renderer
        .create(
            <GenresList
              genre={GENRES.ALL}
              movies={movies}
              onClick={()=>{}}
            />)
        .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
