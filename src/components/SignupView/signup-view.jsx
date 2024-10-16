import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch("https://cfmyflix-86e2d60f88de.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if(response.ok) {
        alert("Signup successful!");
        window.location.reload();
      } else {
        alert("Signup failed!");
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label></Form.Label>
        <Form.Control
          type="text"
          placeholder="Choose username"
          value={username}
          onChange={(e)=> setUsername(e.target.value)}
          required
          minLength="5"
          />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label></Form.Label>
        <Form.Control
          type="password"
          placeholder="Choose password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="8"
          />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label></Form.Label>
        <Form.Control
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <div className="d-flex justify-content-center mt-3">
        <Button variant="primary" type="submit" style={{color:"white"}}>
          Submit
        </Button>
      </div>
    </Form> 
  );
};