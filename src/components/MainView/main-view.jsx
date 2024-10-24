import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";
import { MovieView } from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { SignupView } from "../SignupView/signup-view";
import { ProfileView } from "../ProfileView/profile-view";
import { UpdateUser } from "../ProfileView/profile-view";
import { DeleteUser } from "../ProfileView/delete-account";
import { Favorites } from "../FavoritesView/favorites";
import { NavBar } from "../NavigationBar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [genreFilter, setGenreFilter] = useState("");
  const [directorFilter, setDirectorFilter] = useState("");

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

  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  // Filterung movies
  const filteredMovies = movies.filter((movie) => {
    return (
      (genreFilter ? movie.genre.toLowerCase().includes(genreFilter.toLowerCase()) : true) &&
      (directorFilter ? movie.director.toLowerCase().includes(directorFilter.toLowerCase()) : true)
    );
  });

  return (
    <BrowserRouter>
      <NavBar user={user} onLoggedOut={onLoggedOut} />
      <Row className="justify-content-center" style={{ height: "50vh", alignItems: "center" }}>
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={4}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={4}>
                    <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>No movies available!</Col>
                ) : (
                  <Col className="d-flex justify-content-md-center" md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col className="d-flex flex-column" md={5}>
                    <ProfileView user={user} token={token} />
                    <div className="mt-4">
                      <UpdateUser user={user} token={token} setUser={setUser} />
                    </div>
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/profile/delete"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col className="d-flex flex-column align-items-center" md={8}>
                    <DeleteUser user={user} token={token} onLoggedOut={onLoggedOut} />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/favorites"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>No movies available!</Col>
                ) : (
                  <Col className="d-flex justify-content-md-center" md={8}>
                    <Favorites user={user} token={token} movies={movies} />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>No movies available!</Col>
                ) : (
                  <>
                    <div className="mb-4">
                        <Row className="g-3"> 
                          <Col xs={6}>
                            <input
                              type="text"
                              placeholder="Filter by Genre"
                              value={genreFilter}
                              onChange={(e) => setGenreFilter(e.target.value)}
                              className="form-control"
                            />
                          </Col>
                          <Col xs={6}>
                            <input
                              type="text"
                              placeholder="Filter by Director"
                              value={directorFilter}
                              onChange={(e) => setDirectorFilter(e.target.value)}
                              className="form-control"
                            />
                          </Col>
                        </Row>
                    </div>

                    

                    {filteredMovies.map((movie) => (
                      <Col className="mb-4" key={movie.id} xs={12} sm={6} md={4} lg={3}>
                        <MovieCard user={user} token={token} movie={movie} setUser={setUser} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
