import "./movie-view.scss";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Card style={{ width: '20rem', backgroundColor: "#323232" }}>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body style={{backgroundColor:"#323232", color:"white"}}>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>
          {movie.description}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Director: {movie.director}</ListGroup.Item>
        <ListGroup.Item>Genre: {movie.genre}</ListGroup.Item>
      </ListGroup>
      <Card.Body className="d-flex justify-content-md-center">
      <Button variant="primary" onClick={onBackClick} className="back-button" style={{color:"white"}}>Return to movies</Button>
      </Card.Body>
    </Card>
  );
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    genre: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
