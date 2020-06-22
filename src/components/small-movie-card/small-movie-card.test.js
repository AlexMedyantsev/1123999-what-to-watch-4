import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card.jsx";

import {movieInfo} from "../../mocks/movie-info.js";

describe(`it should SmallMovieCard render correctly`, () => {
  it(`Small card component`, () => {
    const tree = renderer
      .create(<SmallMovieCard
        movie={movieInfo}
        onTitleClick={() => {}}
        onMouseEnter={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
