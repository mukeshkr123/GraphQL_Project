import { Link } from "react-router-dom";
import "./Navbar.css"; // Import your CSS for styling.

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">
        Users
      </Link>{" "}
      <Link to="/movies" className="nav-link">
        Movies
      </Link>
    </nav>
  );
};

export default Navbar;
