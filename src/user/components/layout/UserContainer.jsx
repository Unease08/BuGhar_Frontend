import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../../../App.css";

function UserContainer({ children, showNavAndFooter = true }) {
  return (
    <div className="user-container">
      {showNavAndFooter && <Navbar />}
      {children}
      {showNavAndFooter && <Footer />}
    </div>
  );
}

export default UserContainer;
