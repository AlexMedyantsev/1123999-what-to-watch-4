import React from "react";
import renderer from "react-test-renderer";
import MovieDetails from "./movie-details.jsx";

const movie = {
  background: `img/movie.jpg`,
  title: `The Movie`,
  releaseYear: 2014,
  genre: `Drama`,
  poster: `img/movie-poster.jpg`,
  ratingScore: 8.9,
  ratingLevel: `Very Good`,
  ratingCount: 245,
  director: `Wes Andreson`,
  actors: `Actors`,
  description: `description`,
};

describe(`Movie Details Snapshot`, () => {
  it(`Should MovieDetails render correctly`, () => {
    const tree = renderer
      .create(<MovieDetails
        movieBackground={movie.background}
        movieTitle={movie.title}
        movieReleaseYear={movie.releaseYear}
        movieGenre={movie.genre}
        moviePoster={movie.poster}
        movieRatingScore={movie.ratingScore}
        movieRatingLevel={movie.ratingLevel}
        movieRatingCount={movie.ratingCount}
        movieDirector={movie.director}
        movieActors={movie.actors}
        movieDescription={movie.description}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

