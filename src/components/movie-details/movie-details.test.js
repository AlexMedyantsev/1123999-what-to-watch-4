import React from "react";
import renderer from "react-test-renderer";
import MovieDetails from "./movie-details.jsx";

const movie = {
  backgroundImage: `img/movie.jpg`,
  title: `The Movie`,
  releaseYear: 2014,
  genre: `Drama`,
  poster: `img/movie-poster.jpg`,
  ratingScore: 8.9,
  ratingLevel: `Very Good`,
  ratingCount: 245,
  director: [`Wes Andreson`],
  actors: `Actors`,
  description: [`description`],
};

describe(`Movie Details Snapshot`, () => {
  it(`Should MovieDetails render correctly`, () => {
    const tree = renderer
      .create(<MovieDetails
        movie={movie}
      />, {
        createNodeMock: () => {
          return {};
        }
      })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

