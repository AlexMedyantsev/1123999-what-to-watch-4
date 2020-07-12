import React from "react";
import renderer from "react-test-renderer";

import GenresList from "./genres-list.jsx";

const GENRES = [`Comedy`, `Drama`, `Sience`, `Action`, `Fantasy`, `Thriller`, `Romance`, `Sci-Fi`];

describe(`Render Correctly`, () => {
  it(`Should GenresList render correctly`, () => {
    const handlerSetCurrentGenre = jest.fn();
    const tree = renderer
      .create(
          <GenresList
            genresList={GENRES}
            currentGenre={GENRES.ALL}
            setCurrentGenre={handlerSetCurrentGenre}
          />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
