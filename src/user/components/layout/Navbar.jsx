import React from "react";
import { Link } from "react-router-dom";
import "../../../App.css";
function Navbar() {
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
      </ul>
    </nav>
  );
}

export default Navbar;
