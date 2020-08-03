import NameSpace from "../name-space";

export const getMovies = (state) => state[NameSpace.DATA].movies;

export const getMovieById = (state, id) => state[NameSpace.DATA].movies.find((movie) => id === movie.id);

export const getPromoMovie = (state) => state[NameSpace.DATA].promoMovie;
