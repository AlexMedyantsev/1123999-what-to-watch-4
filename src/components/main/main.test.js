import React from "react";
import rerender from "react-test-renderer";
import Main from "./main.jsx";

const HeaderMovieData = {
  TITLE: `Movie Title`,
  GENRE: `Drama`,
  YEAR: 2009,
};

const MOVIES = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Avatar`, `Aviator`, `Pulp fiction`];

describe(`Render component`, () => {
  it(`Should Main render correctly`, () => {
    const tree = rerender
      .create(<Main
        title={HeaderMovieData.title}
        genre={HeaderMovieData.genre}
        year={HeaderMovieData.year}
        movies={MOVIES}
        onTitleMovieLinkClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
