import React from "react";
import rerender from "react-test-renderer";
import App from "./app.jsx";

const HeaderMovieData = {
  TITLE: `Movie Title`,
  GENRE: `Drama`,
  YEAR: 2009,
};

const MOVIES = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `Avatar`, `Aviator`, `Pulp fiction`];

describe(`Render component`, () => {
  it(`Should App render correctly`, () => {
    const tree = rerender
      .create(<App
        name={HeaderMovieData.TITLE}
        genre={HeaderMovieData.GENRE}
        year={HeaderMovieData.YEAR}
        films={MOVIES}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
