import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../user/pages/Home";
import About from "../user/pages/About";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} exact />
      <Route path="/about" element={<About />} exact />
    </Routes>
  );
};

export default UserRoutes;
