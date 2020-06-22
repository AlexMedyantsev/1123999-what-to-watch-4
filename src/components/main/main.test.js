import React from "react";
import rerender from "react-test-renderer";
import Main from "./main.jsx";

import films from "../../mocks/films.js";

const HeaderMovieData = {
  TITLE: `Movie Title`,
  GENRE: `Drama`,
  YEAR: 2009,
};


describe(`Render component`, () => {
  it(`Should Main render correctly`, () => {
    const tree = rerender
      .create(<Main
        headerMovieTitle={HeaderMovieData.TITLE}
        headerMovieGenre={HeaderMovieData.GENRE}
        headerMovieYear={HeaderMovieData.YEAR}
        movies={films}
        OnTitleClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
