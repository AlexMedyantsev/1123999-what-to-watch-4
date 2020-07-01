import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import SmallMovieCard from "./small-movie-card.jsx";

const movie = {
  title: `Bekket`,
  image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
};

Enzyme.configure({
  dapter: new Adapter(),
});

describe(`Small Movie Card hover test`, () => {
  it(`movie's index'll pass to handler if user hovers to movie's card`, () => {
    const onMovieCardHover = jest.fn((index) => index);
    const cardIndex = Math.round(Math.random(7));

    const movieCard = shallow(
        <SmallMovieCard
          image={movie.image}
          title={movie.title}
          index={cardIndex}
          onMovieCardClick={() => {}}
          onMovieCardHover={onMovieCardHover}
        />
    );

    const cardImage = movieCard.find(`.small-movie-card__image`);

    cardImage.simulate(`mouseover`, () => {});

    expect(onMovieCardHover).toHaveBeenCalledTimes(1);
    expect(onMovieCardHover.mock.results[0].value).toBe(cardIndex);
  });
});

describe(`Movie Details correct open on small movie card click check`, () => {
  it(`movie's detailed card opens if user clicks to movie's image`, () => {
    const onMovieCardClick = jest.fn((index) => index);
    const cardIndex = Math.round(Math.random(7));

    const movieCard = shallow(
        <SmallMovieCard
          image={movie.image}
          title={movie.title}
          index={cardIndex}
          onMovieCardClick={onMovieCardClick}
          onMovieCardHover={() => {}}
        />
    );

    const cardImage = movieCard.find(`.small-movie-card__image`);

    cardImage.simulate(`click`);

    expect(onMovieCardClick).toHaveBeenCalledTimes(1);
    expect(onMovieCardClick.mock.results[0].value).toBe(cardIndex);
  });

  it(`movie's detailed card opens if user clicks to movie's title`, () => {
    const onMovieCardClick = jest.fn((index) => index);
    const cardIndex = Math.round(Math.random(7));

    const movieCard = shallow(
        <SmallMovieCard
          image={movie.image}
          title={movie.title}
          index={cardIndex}
          onMovieCardClick={onMovieCardClick}
          onMovieCardHover={() => {}}
        />
    );

    const cardTitle = movieCard.find(`.small-movie-card__title`);

    cardTitle.simulate(`click`);

    expect(onMovieCardClick).toHaveBeenCalledTimes(1);
    expect(onMovieCardClick.mock.results[0].value).toBe(cardIndex);
  });
});
