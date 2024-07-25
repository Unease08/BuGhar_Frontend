import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../App.css";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear tokens from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_type");

    toast.success("Logged out successfully");

    // Redirect to login page or another appropriate page
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">MyApp</div>
      <ul className="navbar-links">
        <li>
          <Link to="/home">
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to="/about">
            <span>About</span>
          </Link>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
          >
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
