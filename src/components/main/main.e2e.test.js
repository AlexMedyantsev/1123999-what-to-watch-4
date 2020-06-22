import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Main from "./main.jsx";

import films from "../../mocks/films.js";

Enzyme.configure({
  adapter: new Adapter()
});

const HeaderMovieData = {
  TITLE: `Movie Title`,
  GENRE: `Drama`,
  YEAR: 2009,
};

describe(`Click button`, () => {
  it(`Should title link be pressed`, () => {
    const OnTitleClick = jest.fn();

    const mainComponent = shallow(
        <Main
          headerMovieTitle={HeaderMovieData.TITLE}
          headerMovieGenre={HeaderMovieData.GENRE}
          headerMovieYear={HeaderMovieData.YEAR}
          movies={films}
          OnTitleClick={OnTitleClick}
        />

    );

    const movieTitleLinks = mainComponent.find(`.a-small-movie-card__link`);

    movieTitleLinks.forEach((titleLink) => {
      titleLink.props().onClick();
    });

    expect(OnTitleClick.mock.calls.length).toBe(movieTitleLinks.length);
  });
});
