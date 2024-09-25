import React from "react";
import "../../../App.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

function CompanyContainer({ children, showNavAndFooter = true }) {
  return (
    <div className="user-container">
      {showNavAndFooter && <Navbar />}
      {children}
      {showNavAndFooter && <Footer />}
    </div>
  );
}

export default CompanyContainer;
