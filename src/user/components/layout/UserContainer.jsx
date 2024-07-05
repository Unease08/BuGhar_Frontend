import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../../../index.css";

function UserContainer({ children }) {
  return (
    <>
      <div className="user-container">
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
}

export default UserContainer;
