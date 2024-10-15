import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="h-100" onClick={() => onMovieClick(movie)} style={{cursor:"pointer", marginTop:"40px"}}>
      <Card.Img variant="top" src={movie.image} style={{height:"300px"}} />
      <Card.Body style={{backgroundColor:"#323232", color:"white"}}>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director}</Card.Text>
        
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
  onMovieClick: PropTypes.func.isRequired,
};
