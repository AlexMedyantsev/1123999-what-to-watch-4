const getLevel = (score) => {
  let level = ``;

  if (score < 3) {
    level = `Bad`;
  } else if (score >= 3 && score < 5) {
    level = `Normal`;
  } else if (score >= 5 && score < 8) {
    level = `Good`;
  } else if (score >= 8 && score < 10) {
    level = `Very Good`;
  } else if (score === 10) {
    level = `Awesome`;
  }

  return level;
};

export default function (moviesFromServer) {
  return moviesFromServer.map((movie) => {
    return ({
      image: movie.preview_image,
      posterSrc: movie.poster_image,
      bgSrc: movie.background_image,
      title: movie.name,
      genre: movie.genre,
      year: movie.released,
      score: movie.rating,
      level: getLevel(movie.rating),
      movieLink: movie.video_link,
      previewLink: movie.preview_video_link,
      scoresCount: movie.scores_count,
      description: movie.description,
      director: movie.director,
      starring: movie.starring,
      runTime: movie.run_time,
      link: `movie-page.html`,
      id: movie.id,
      backgroundColor: movie.background_color,
      isFavorite: movie.is_favorite
    });
  });
}
