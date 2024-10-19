import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, user, token }) => {
  
  const AddToFavorites = () => {
    fetch(`https://cfmyflix-86e2d60f88de.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then((response) => {
      if (response.ok) {
        alert(`${movie.title} added to favorites!`);
      } else {
        alert("Failed to add movie to favorites.");
      }
    })
    .catch((err) => {
      console.error("Error adding movie to favorites: ", err);
      alert("Something went wrong.");
    });
  };

  return (
    <Card border="dark" className="h-100">
      <Card.Img variant="top" src={movie.image} style={{ height: "300px" }} />
      <Card.Body style={{ backgroundColor: "#323232", color: "white" }}>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: "10px" }}>
          <Button variant="primary" style={{color: "white"}} as={Link} to={`/movies/${encodeURIComponent(movie.id)}`}>
          See more
        </Button>
          <Button variant="danger" onClick={AddToFavorites}>
            Add to Favorites
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    genre: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired
  }).isRequired,
  token: PropTypes.string.isRequired,
};
