import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../user/pages/Home";
import About from "../user/pages/About";
import Login from "../user/components/login/Login";
import UserContainer from "../user/components/layout/UserContainer";
import HomePage from "../user/pages/homepage/HomePage";

const UserRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <UserContainer showNavAndFooter={false}>
            <HomePage />
          </UserContainer>
        }
        exact
      />
      <Route
        path="/home"
        element={
          <UserContainer>
            <Home />
          </UserContainer>
        }
        exact
      />
      <Route
        path="/login"
        element={
          <UserContainer showNavAndFooter={false}>
            <Login />
          </UserContainer>
        }
        exact
      />
      <Route
        path="/about"
        element={
          <UserContainer>
            <About />
          </UserContainer>
        }
        exact
      />
    </Routes>
  );
};

export default UserRoutes;
