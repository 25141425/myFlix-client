import "./movie-view.scss";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export const MovieView = ({ movies }) => {
  const {movieId} = useParams();
  const movie = movies.find((m) => m.id === movieId);
  

  return (
    <Card style={{ width: '15rem', backgroundColor: "#323232" }}>
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
      <Link to={`/`}>
      <Button variant="primary" style={{color:"white"}}>Back</Button> 
      </Link>
      </Card.Body>
    </Card>
  );
}

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // make sure to include the id
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      genre: PropTypes.string,
      image: PropTypes.string,
    })
  ).isRequired,
};
