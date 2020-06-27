import React from "react";
import rerender from "react-test-renderer";
import App from "./app.jsx";

const HeaderMovieData = {
  TITLE: `Movie Title`,
  GENRE: `Drama`,
  YEAR: 2009,
};

const MOVIES = [
  {
    title: `Fantastic Beasts`,
    image: `./macbeth.jpg`
  },
  {
    title: `Bohemian Rhapsody`,
    image: `./macbeth.jpg`
  },
  {
    title: `Macbeth`,
    image: `./macbeth.jpg`
  },
];

describe(`Render component`, () => {
  it(`Should App render correctly`, () => {
    const tree = rerender
      .create(<App
        name={HeaderMovieData.TITLE}
        genre={HeaderMovieData.GENRE}
        year={HeaderMovieData.YEAR}
        movies={MOVIES}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
