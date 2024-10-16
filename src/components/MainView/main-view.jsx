import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { SignupView } from "../SignupView/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = (localStorage.getItem("token"));
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) return; // Stops following code from running when token doesn't exist
  
    fetch("https://cfmyflix-86e2d60f88de.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((mov) => {
          return {
            id: mov._id,
            description: mov.Description,
            title: mov.Title,
            director: mov.Director.Name,
            genre: mov.Genre.Name,
            image: mov.ImagePath,
          };
        });
        setMovies(moviesFromApi); 
      })
      .catch((error) => {
        console.error('Fetch failed:', error);
        alert("Error fetching movies!");
      });
  }, [token]); // token as second argument ensures fetch is called every time token changes
  

  return (
    <Row className="justify-content-md-center" style={{ height: "100vh", alignItems: "center" }}>
      {!user ? (
        <Col md={3}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          
      <div className="d-flex justify-content-center my-5">
        Don't have an account yet? Sign up!
      </div>
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col className="d-flex justify-content-md-center" md={3}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
        <Row className="justify-content-md-end">
          <Col className="mt-3" md={1}>
        <Button variant="primary" style={{color:"white"}}
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logout
          </Button>
          </Col>
        </Row>
          {movies.map((movie) => (
            <Col className="mb-2" key={movie.id} md={3}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}      
        </>
      )}
    </Row>
  );
};
