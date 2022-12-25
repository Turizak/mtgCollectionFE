import React from "react";
import Movie from "./Movie";

const MoviesList = (props: any) => {
  return (
    <ul>
      {props.movies.map((movie: any) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  );
};

export default MoviesList;
