import React from "react";
import rerender from "react-test-renderer";
import Main from "./main.jsx";

const HeaderMovieData = {
  TITLE: `Movie Title`,
  GENRE: `Drama`,
  YEAR: 2009,
};

const movies = [
  {
    title: `Bekket`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  },
  {
    title: `The Doom Generation`,
    image: `img/bohemian-rhapsody.jpg`,
  },
  {
    title: `Patrool`,
    image: `img/macbeth.jpg`,
  },
];


describe(`Render component`, () => {
  it(`Should Main render correctly`, () => {
    const tree = rerender
      .create(<Main
        name={HeaderMovieData.TITLE}
        genre={HeaderMovieData.GENRE}
        year={HeaderMovieData.YEAR}
        movies={movies}
        onClick={() => {}}
        onMouseEnter={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
