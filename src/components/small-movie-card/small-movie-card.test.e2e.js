import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import SmallMovieCard from "./small-movie-card.jsx";
import {movieInfo} from "../../mocks/movie-info.js";

Enzyme.configure({
  dapter: new Adapter(),
});

describe(`small movie card e2e test`, () => {
  it(`Should get movie info`, () => {
    const onMouseEnter = jest.fn();

    const movieCardComponent = shallow(
        <SmallMovieCard
          movie={movieInfo}
          onTitleClick={() => {}}
          onPosterClick={() => {}}
          onMouseEnter={onMouseEnter}
        />);

    const smallMovieCard = movieCardComponent.find(`.small-movie-card`);

    smallMovieCard.simulate(`mouseenter`, movieInfo);

    expect(onMouseEnter.mock.calls[0][0]).toMatchObject(movieInfo);
  });
});

