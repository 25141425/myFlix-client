import { useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Reservoir Dogs",
      description: "The film is regarded as a classic of independent film and a cult film and was named Greatest Independent Film of All Time by Empire.",
      image:
        "https://m.media-amazon.com/images/I/71Vgw4EjygL._AC_UY218_.jpg",
      director: "Quentin Tarantino",
      genre: "Action",
    },
    {
      id: 2,
      title: "Dunkirk",
      description: "The evacuation of British and Allied troops from Dunkirk during World War II.",
      image:
        "https://m.media-amazon.com/images/I/81N18ua8P-L._AC_UY218_.jpg",
      director: "Christopher Nolan",
      genre: "Action",
    },
    {
      id: 3,
      title: "Gone Girl",
      description: "A man becomes the prime suspect when his wife goes missing and her story unfolds in the media.",
      image:
        "https://m.media-amazon.com/images/I/61XJBJDl6PL._AC_UY218_.jpg",
      director: "David Fincher",
      genre: "Thriller",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
