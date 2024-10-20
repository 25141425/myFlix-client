import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Form } from "react-bootstrap";

export const ProfileView = ({ user }) => {
  return (
    <>
      <div>
        <h1>Your Profile</h1>
        <div>Username: {user.Username}</div>
        <div>Email: {user.Email}</div>
        <div>Birthday: {new Date(user.Birthday).toLocaleDateString()}</div>
      </div>
    </>
  );
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string,
    Birthday: PropTypes.string,
  }).isRequired,
};

export const UpdateUser = ({ user, token, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username || user.Username,
      Email: email || user.Email,
      Birthday: birthday || user.Birthday,
    };

    if (password !== "") {
      data.Password = password;
    }

    fetch(`https://cfmyflix-86e2d60f88de.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); 
        } else {
          alert("Update failed!");
          throw new Error("Update failed!");
        }
      })
      .then((updatedUser) => {
        setUser(updatedUser); // Update user data
        alert("Update successful!");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  return (
    <>
      <h1>Update Profile</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>New Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength="5"
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>New Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="5"
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>New Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBirthday">
          <Form.Label>New Birthdate:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>

        <div className="d-flex justify-content-center mt-3">
          <Button variant="primary" type="submit" style={{ color: "white" }}>
            Submit
          </Button>
        </div>
      </Form>
      <div className="d-flex justify-content-center mt-3">
        <Button variant="danger" as={Link} to="/profile/delete">
          Delete Account
        </Button>
      </div>
    </>
  );
};

UpdateUser.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string,
    Birthday: PropTypes.string,
  }).isRequired,
  token: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
};
