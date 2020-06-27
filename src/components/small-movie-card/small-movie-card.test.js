import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card.jsx";

const film = {
  image: `img/snatch.jpg`,
  name: `Snatch`,
};

describe(`it should SmallMovieCard render correctly`, () => {
  it(`Small card component`, () => {
    const tree = renderer
      .create(<SmallMovieCard
        backgroundImage={film.image}
        image={film.image}
        name={film.name}
        index={Math.random() * 100}
        onMovieCardClick={() => {}}
        onMovieCardHover={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
