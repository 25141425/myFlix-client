import "./movie-view.scss";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
      <span>Description: </span>
      <span>{movie.description} </span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <div>
      <span>Genre: </span>
      <span>{movie.genre}</span>
      </div>
      <Button variant="primary" onClick={onBackClick} className="back-button" style={{color:"white"}}>Return to movies</Button>
    </div>
  );
};

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
