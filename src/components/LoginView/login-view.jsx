import {useState} from "react"

export const LoginView = ({onLoggedIn}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (event) => {
    event.preventDefault(); // Preventing page reload when clicking submit button

    const data = {
      Username: username,
      Password: password
    };

    fetch("https://cfmyflix-86e2d60f88de.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user)); // Save user & token in localStorage
          localStorage.setItem("token", (data.token));
          onLoggedIn(data.user, data.token);
        } else {
          alert("Wrong username or password!");
        }
      })
      .catch((e) => {
        alert("Something went wrong!");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required 
         />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};