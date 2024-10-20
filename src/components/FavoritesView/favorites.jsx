import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

export const Favorites = ({ user, token, movies }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    if (!token) return;

    // Fetch user data to get FavoriteMovies
    fetch(`https://cfmyflix-86e2d60f88de.herokuapp.com/users/${user.Username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((user) => {
        const filteredMovies = movies.filter((m) => user.FavoriteMovies.includes(m.id));
        setFavoriteMovies(filteredMovies);
      })
      .catch((error) => {
        console.error("Fetch failed:", error);
        alert("Error fetching user data!");
      });
  }, []); 

// Remove movie from favorites

const removeFavorite = (movieId) => {
  fetch(`https://cfmyflix-86e2d60f88de.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        setFavoriteMovies((prevFavorites) =>
          prevFavorites.filter((movie) => movie.id !== movieId)
        );
      } else {
        alert("Failed to remove the movie from favorites.");
      }
    })
    .catch((error) => {
      console.error("Error removing the movie:", error);
      alert("Error removing the movie!");
    });
};

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {favoriteMovies.length === 0 ? ( // Check if there are no favorite movies
        <p>No favorite movies yet.</p>
      ) : (
        favoriteMovies.map((movie) => (
          <Card key={movie.id} style={{ width: "15rem", backgroundColor: "#323232", margin: "10px" }}>
            <Card.Img variant="top" src={movie.image} />
            <Card.Body style={{ backgroundColor: "#323232", color: "white" }}>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Director: {movie.director}</ListGroup.Item>
              <ListGroup.Item>Genre: {movie.genre}</ListGroup.Item>
            </ListGroup>
            <Card.Body className="d-flex justify-content-md-center">  
            <Button
                variant="primary"
                style={{ color: "white" }}
                onClick={() => removeFavorite(movie.id)} // Aufruf der Funktion zum Entfernen
              > 
              Remove
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

Favorites.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  movies: PropTypes.array.isRequired,
};
