import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../App.css";
import toast from "react-hot-toast";
import logo from '../../../assets/logo.png'

const Navbar = () => {
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
    <div className="bg-background bg-n-11 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img
          undefinedhidden="true"
          alt="logo"
          src={logo}
          className="w-8 h-8 mr-2"
          width={128}
          height={128}
        />
      </div>
      <nav className="flex space-x-6 text-white">
        <a href="#" className="text-muted hover:text-foreground">
          Dashboard
        </a>
        <a href="#" className="text-muted hover:text-foreground">
          Engagements
        </a>
        <a href="#" className="text-muted hover:text-foreground">
          Invites
        </a>
        <a href="#" className="text-muted hover:text-foreground">
          Discovery
        </a>
        <a href="#" className="text-muted hover:text-foreground">
          Work
        </a>
        <a href="#" className="text-muted hover:text-foreground">
          Payments
        </a>
        <a href="#" className="text-muted hover:text-foreground">
          Leaderboards
        </a>
        <a href="#" className="text-muted hover:text-foreground">
          CrowdStream
        </a>
      </nav>
      <div className="flex items-center">
        <span className="text-white">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
          >
            <span>Logout</span>
          </a>
        </span>
        <div className="w-3 h-3 bg-accent rounded-full ml-4"></div>
      </div>
    </div>
  );
};

export default Navbar;
