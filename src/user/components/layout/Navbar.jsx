import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../App.css";
import toast from "react-hot-toast";
import logo from "../../../assets/logo.png";
import { CgProfile } from "react-icons/cg";
import { RiSettings4Fill } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import api from "../../../library/Api";
import config from "../../../config";
import { FaChartPie } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";
import { TbReportMoney } from "react-icons/tb";

const Navbar = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const dropdownRef = useRef(null);
  const profileImgRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_type");

    toast.success("Logged out successfully");

    window.location.href = "/auth/login";
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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("/user/details", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const data = response.data;
        if (data.profile_picture) {
          const imageUrl = `${config.BASE_URL}/${data.profile_picture}`;
          setProfilePicture(imageUrl);
        } else {
          setProfilePicture(null);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error.message || error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="bg-background bg-n-11 p-4 flex items-center justify-between">
      <div className="flex items-center">
        {/* <img alt="logo" src={logo} className="w-100 h-8 mr-2" /> */}
      </div>
      <nav className="flex space-x-20 text-white">
        <span className="text-muted flex items-center gap-2 hover:text-foreground cursor-pointer">
          <i>
            <FaChartPie />
          </i>
          <Link to="/dashboard">Dashboard</Link>
        </span>
        <span className="text-muted flex items-center gap-2 hover:text-foreground cursor-pointer">
          <i>
            <FaBook />
          </i>
          <Link to="/programs">Programs</Link>
        </span>
        <span className="text-muted flex items-center gap-2 hover:text-foreground cursor-pointer">
          <i>
            <TbReportAnalytics />
          </i>
          <Link to="/myreport">My Report</Link>
        </span>
        <span className="text-muted flex items-center gap-2 hover:text-foreground cursor-pointer">
          <i>
            <TbReportMoney />
          </i>
          <Link to="/payment"> Payment</Link>
        </span>
      </nav>
      <div className="flex items-center">
        <div className="relative flex items-center">
          <img
            ref={profileImgRef}
            src={
              profilePicture ||
              "https://saugat-nepal.com.np/assets/img/profile-img.png"
            }
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
