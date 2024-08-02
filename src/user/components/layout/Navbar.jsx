import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../App.css";
import toast from "react-hot-toast";
import logo from "../../../assets/logo.png";
import profile1 from "../../../assets/profile1.jpg";
import { CgProfile } from "react-icons/cg";
import { RiSettings4Fill } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";

const Navbar = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileImgRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_type");

    toast.success("Logged out successfully");

    navigate("/");
  };

  const toggleDropdown = () => {
    setDropDownOpen((prevState) => !prevState);
  };

  const closeDropdown = () => {
    setDropDownOpen(false);
  };

  // Handle clicks outside of the dropdown and profile image
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profileImgRef.current &&
        !profileImgRef.current.contains(event.target)
      ) {
        setDropDownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-background bg-n-11 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img alt="logo" src={logo} className="w-100 h-8 mr-2" />
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
        <div className="relative flex items-center">
          <img
            ref={profileImgRef}
            src={profile1}
            alt="profile"
            className="w-9 h-9 rounded-full ml-4 bg-white cursor-pointer"
            onClick={toggleDropdown}
          />
          {dropDownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-3 top-10 w-48 bg-n-12 rounded-md shadow-lg py-2 z-20"
            >
              <h1 className="text-white block px-4 py-2 text-center font-bold cursor-pointer">
                Anish Shrestha
              </h1>
              <hr className="font-bold" />
              <Link
                to="/profile"
                onClick={closeDropdown} // Close dropdown on click
                className="flex gap-3 items-center px-4 py-2 text-white hover:bg-n-4"
              >
                <i className="text-2xl">
                  <CgProfile />
                </i>
                Profile
              </Link>
              <Link
                to="/settings"
                onClick={closeDropdown} // Close dropdown on click
                className="flex gap-3 items-center px-4 py-2 text-white hover:bg-n-4"
              >
                <i className="text-2xl">
                  <RiSettings4Fill />
                </i>
                Settings
              </Link>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                  closeDropdown(); // Close dropdown on click
                }}
                className="flex gap-3 items-center px-4 py-2 text-white hover:bg-n-4"
              >
                <i className="text-2xl">
                  <AiOutlineLogout />
                </i>
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
