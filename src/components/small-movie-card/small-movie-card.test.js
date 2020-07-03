import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card.jsx";

const movie = {
  backgroundImage: `img/snatch.jpg`,
  image: `img/snatch.jpg`,
  preview: `img/snatch.jpg`,
  title: `Snatch`,
  id: 3,
};

describe(`it should SmallMovieCard render correctly`, () => {
  it(`Small card component`, () => {
    const tree = renderer
      .create(<SmallMovieCard
        movie={movie}
        source={movie.preview}
        id={movie.id}
        index={Math.random() * 100}
        isPlaying={true}
        onMovieCardClick={() => {}}
        onMovieCardHover={() => {}}
        onMovieCardHoverLeave={() => {}}
      />, {
        createNodeMock: () => {
          return {};
        }
      })
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
