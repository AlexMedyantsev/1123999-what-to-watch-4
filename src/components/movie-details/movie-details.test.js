// import React from "react";
// import renderer from "react-test-renderer";
// import MovieDetails from "./movie-details.jsx";
// import {MemoryRouter} from "react-router-dom";
// import history from "../../history.js";

// import {Provider} from "react-redux";
// import {GENRES, SHOWING_MOVIES_COUNT_ON_START} from "../../utils/consts.js";
// import AuthorizationStatus from "../../reducer/user/user.js";
// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);


// const movies = [
//   {
//     image: `a`,
//     posterSrc: `a`,
//     bgSrc: `a`,
//     title: `Name`,
//     genre: `Genre`,
//     year: 2014,
//     score: 8.9,
//     level: `level`,
//     movieLink: `link`,
//     previewLink: `preview-link`,
//     scoresCount: 220,
//     description: `description`,
//     director: `director`,
//     starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
//     runTime: `01h30m`,
//     link: `movie-page.html`,
//     id: 1,
//     backgroundColor: `background_color`,
//     isFavorite: true,
//   },
// ];

// const movieAsObject = {
//   image: `a`,
//   posterSrc: `a`,
//   bgSrc: `a`,
//   title: `Name`,
//   genre: `Genre`,
//   year: 2014,
//   score: 8.9,
//   level: `level`,
//   movieLink: `link`,
//   previewLink: `preview-link`,
//   scoresCount: 220,
//   description: `description`,
//   director: `director`,
//   starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
//   runTime: `01h30m`,
//   link: `movie-page.html`,
//   id: 1,
//   backgroundColor: `background_color`,
//   isFavorite: true,
// };

// const comments = [
//   {
//     id: 1,
//     user: {
//       id: 13,
//       name: `Zak`,
//     },
//     rating: 9,
//     comment: `Unfortunately we don't have a reliable way to tell the true ratings of a movie.`,
//     date: `2020-07-19T16:06:01.831Z`,
//   }
// ];

// describe(`Movie Details Snapshot`, () => {
//   it(`Should MovieDetails render correctly`, () => {
//     const store = mockStore({
//       DATA: {
//         movies,
//       },
//       CONDITION: {
//         currentGenre: GENRES.ALL,
//         countMoviesShow: SHOWING_MOVIES_COUNT_ON_START
//       },
//       USER: {
//         authorizationStatus: AuthorizationStatus,
//       },
//       PLAYER: {
//         isVideoPlayerOpened: false,
//       },
//       COMMENTS: {
//         comments,
//       }
//     });
//     const tree = renderer
//       .create(
//           <Provider store={store}>
//             <MemoryRouter history={history}>
//               <MovieDetails
//                 movie={movieAsObject}
//                 onMovieCardClick={() => {}}
//                 similarMovies={movies}
//               />
//             </MemoryRouter>
//           </Provider>, {
//             createNodeMock: () => {
//               return {};
//             }
//           })
//       .toJSON();

//     expect(tree).toMatchSnapshot();
//   });
// });

import React from "react";
import rerender from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {MemoryRouter} from "react-router";
import NameSpace from "../../reducer/name-space.js";

import {MovieDetails} from "./movie-details.jsx";

const mockStore = configureStore([]);

const movies = [
  {
    id: 0,
    title: `Pulp Fuction`,
    img: `img/pulp-fiction.jpg`,
    release: 1994,
    genre: `Action`,
    poster: `https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,686,1000_AL_.jpg`,
    coverBackground: `https://m.media-amazon.com/images/M/MV5BNTY1MzgzOTYxNV5BMl5BanBnXkFtZTgwMDI4OTEwMjE@._V1_SY1000_CR0,0,1463,1000_AL_.jpg`,
    rating: {
      score: 8.9,
      scoreDesc: `Very good`,
      amount: 2323
    },
    description: `The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
    isFavorite: false,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  },
  {
    id: 1,
    title: `Pulp Fuction`,
    img: `img/pulp-fiction.jpg`,
    release: 1994,
    genre: `Action`,
    poster: `https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,686,1000_AL_.jpg`,
    coverBackground: `https://m.media-amazon.com/images/M/MV5BNTY1MzgzOTYxNV5BMl5BanBnXkFtZTgwMDI4OTEwMjE@._V1_SY1000_CR0,0,1463,1000_AL_.jpg`,
    rating: {
      score: 8.9,
      scoreDesc: `Very good`,
      amount: 2323
    },
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
    description: `The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.`,
    isFavorite: false,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  }
];

describe(`MoviePage test`, () => {
  it(`Should MoviePage component render correctly`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        movies: [{
          id: 0,
          title: `Pulp Fuction`,
          img: `img/pulp-fiction.jpg`,
          release: 1994,
          genre: `Action`,
          poster: `https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,686,1000_AL_.jpg`,
          coverBackground: `https://m.media-amazon.com/images/M/MV5BNTY1MzgzOTYxNV5BMl5BanBnXkFtZTgwMDI4OTEwMjE@._V1_SY1000_CR0,0,1463,1000_AL_.jpg`,
          rating: {
            score: 8.9,
            scoreDesc: `Very good`,
            amount: 2323
          },
          description: `The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.`,
          isFavorite: false,
          preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
        },
        {
          id: 1,
          title: `Pulp Fuction`,
          img: `img/pulp-fiction.jpg`,
          release: 1994,
          genre: `Action`,
          poster: `https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,686,1000_AL_.jpg`,
          coverBackground: `https://m.media-amazon.com/images/M/MV5BNTY1MzgzOTYxNV5BMl5BanBnXkFtZTgwMDI4OTEwMjE@._V1_SY1000_CR0,0,1463,1000_AL_.jpg`,
          rating: {
            score: 8.9,
            scoreDesc: `Very good`,
            amount: 2323
          },
          starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
          description: `The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.`,
          isFavorite: false,
          preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
        }],
        promoMovie: {}
      },
      [NameSpace.CONDITION]: {
        currentGenre: ``,
        countMoviesShow: ``,
      },
      [NameSpace.USER]: {
        authorizationStatus: `s`,
      }
    });
    const tree = rerender
      .create(
          <Provider store={store}>
            <MemoryRouter>
              <MovieDetails
                movie={movies[0]}
                onMovieCardClick={() => {}}
                similarMovies={movies}
                onLoadComments={() => {}}
              />
            </MemoryRouter>
          </Provider>, {
            createNodeMock: () => {
              return {};
            }
          }
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
