import React, { useState } from "react";
import MoviesList from "./MoviesList";
import Button from "./Button";
import Card from "./Card";

const MTGSearch = () => {
  const [movies, setMovies] = useState([]);

  async function fetchMTGCard() {
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();
    const transformedMovies = data.results.map((movieData: any) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });
    setMovies(transformedMovies);
  }
  return (
    <Card>
      <Button onClick={fetchMTGCard}>Search Scryfall</Button>
      <MoviesList movies={movies} />
    </Card>
  );
};

export default MTGSearch;
