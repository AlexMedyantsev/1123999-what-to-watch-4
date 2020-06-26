import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import SmallMovieCard from "./small-movie-card.jsx";

const film = {
  title: `Bekket`,
  image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
};

Enzyme.configure({
  dapter: new Adapter(),
});

describe(`Small Movie Card hover test`, () => {
  it(`Film's index'll pass to handler if user hovers to film's card`, () => {
    const onHover = jest.fn((index) => index);
    const cardIndex = Math.round(Math.random(7));

    const filmCard = shallow(
        <SmallMovieCard
          image={film.image}
          title={film.title}
          index={cardIndex}
          onClick={() => {}}
          onHover={onHover}
        />
    );

    const cardImage = filmCard.find(`.small-movie-card__image`);

    cardImage.simulate(`mouseover`, () => {});

    expect(onHover).toHaveBeenCalledTimes(1);
    expect(onHover.mock.results[0].value).toBe(cardIndex);
  });
});

describe(`Movie Details correct open on small movie card click check`, () => {
  it(`Film's detailed card opens if user clicks to film's image`, () => {
    const onClick = jest.fn((index) => index);
    const cardIndex = Math.round(Math.random(7));

    const filmCard = shallow(
        <SmallMovieCard
          image={film.image}
          title={film.title}
          index={cardIndex}
          onClick={onClick}
          onHover={() => {}}
        />
    );

    const cardImage = filmCard.find(`.small-movie-card__image`);

    cardImage.simulate(`click`);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.results[0].value).toBe(cardIndex);
  });

  it(`Film's detailed card opens if user clicks to film's title`, () => {
    const onClick = jest.fn((index) => index);
    const cardIndex = Math.round(Math.random(7));

    const filmCard = shallow(
        <SmallMovieCard
          image={film.image}
          title={film.title}
          index={cardIndex}
          onClick={onClick}
          onHover={() => {}}
        />
    );

    const cardTitle = filmCard.find(`.small-movie-card__title`);

    cardTitle.simulate(`click`);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.results[0].value).toBe(cardIndex);
  });
});
