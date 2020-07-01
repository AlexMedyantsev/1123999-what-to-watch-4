import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Main from "./main.jsx";

import movies from "../../mocks/movies.js";

Enzyme.configure({
  adapter: new Adapter()
});

describe(`Click button`, () => {
  it(`Should title link be pressed`, () => {
    const onMovieCardClick = jest.fn();

    const mainComponent = shallow(
        <Main
          title={`The Grand Budapest Hotel`}
          genre={`Drama`}
          year={2009}
          movies={movies}
          onMovieCardClick={onMovieCardClick}
        />
    );

    const movieTitle = mainComponent.find(`a.small-movie-card__link`);

    movieTitle.forEach((link) => {
      link.simulate(`click`);
    });

    expect(onMovieCardClick.mock.calls.length).toBe(movieTitle.length);
  });
});
