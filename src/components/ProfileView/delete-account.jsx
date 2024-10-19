import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export const DeleteUser = ({ user, token, onLoggedOut }) => {

  const handleDelete = (event) => {
    event.preventDefault();

    fetch(`https://cfmyflix-86e2d60f88de.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        alert("Your account has been deleted!");
        onLoggedOut(); // Log out user after account is deleted
      } else {
        alert("Deleting account failed!");
      }
    });
  };

  return (
    <>
      <h1>We're sorry to see you go!</h1>
      <div>
        <p>Are you sure?</p>
      </div>
      
      <div className="d-flex justify-content-center mt-3">
        <Button variant="danger" onClick={handleDelete} style={{ color: "white", marginRight: "10px" }}>
          Delete Account
        </Button>
        <Button variant="primary" style={{ color: "white" }} as={Link} to="/profile">
          Cancel
        </Button>
      </div>
    </>
  );
};

DeleteUser.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired, 
  }).isRequired, 
  token: PropTypes.string.isRequired,
  onLoggedOut: PropTypes.func.isRequired,
};
