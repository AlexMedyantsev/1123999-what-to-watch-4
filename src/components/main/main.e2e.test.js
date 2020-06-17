import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Main from "./main.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

const HeaderMovieData = {
  TITLE: `Movie Title`,
  GENRE: `Drama`,
  YEAR: 2009,
};

const MOVIES = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Avatar`, `Aviator`, `Pulp fiction`];

describe(`Click button`, () => {
  it(`Should title link be pressed`, () => {
    const onTitleMovieLinkClick = jest.fn();

    const main = shallow(
        <Main
          headerMovieTitle={HeaderMovieData.TITLE}
          headerMovieGenre={HeaderMovieData.GENRE}
          headerMovieYear={HeaderMovieData.YEAR}
          movies={MOVIES}
          onTitleMovieLinkClick={onTitleMovieLinkClick}
        />

    );

    const movieTitleLinks = main.find(`.a-small-movie-card__link`);

    movieTitleLinks.forEach((titleLink) => {
      titleLink.props().onClick();
    });

    expect(onTitleMovieLinkClick.mock.calls.length).toBe(movieTitleLinks.length);
  });
});
