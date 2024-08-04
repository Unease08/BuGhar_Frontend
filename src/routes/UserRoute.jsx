import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../user/pages/Home";
import About from "../user/pages/About";
import Login from "../user/components/login/Login";
import UserContainer from "../user/components/layout/UserContainer";
import HomePage from "../user/pages/homepage/HomePage";
import PrivateRoute from "../auth/PrivateRoute"; // Adjust the path as needed
import NotFound from "../user/pages/NotFound";
import Register from "../user/components/register/Register";
import ForgotPassword from "../user/components/login/ForgotPassword";
import Profile from "../user/pages/profile/Profile";
import ChangePassword from "../user/components/login/ChangePassword";
import Programs from "../user/pages/programs/Programs";

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
        path="/login"
        element={
          <UserContainer showNavAndFooter={false}>
            <Login />
          </UserContainer>
        }
        exact
      />
      <Route
        path="/register"
        element={
          <UserContainer showNavAndFooter={false}>
            <Register />
          </UserContainer>
        }
        exact
      />
      <Route
        path="/forgotpassword"
        element={
          <UserContainer showNavAndFooter={false}>
            <ForgotPassword />
          </UserContainer>
        }
        exact
      />
      <Route
        path="/home"
        element={
          <UserContainer>
            <PrivateRoute element={<Home />} />
          </UserContainer>
        }
      />
      <Route
        path="/programs"
        element={
          <UserContainer>
            <PrivateRoute element={<Programs />} />
          </UserContainer>
        }
      />
      <Route
        path="/profile"
        element={
          <UserContainer>
            <PrivateRoute element={<Profile />} />
          </UserContainer>
        }
      />
      <Route
        path="/change-password"
        element={
          <UserContainer>
            <PrivateRoute element={<ChangePassword />} />
          </UserContainer>
        }
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

      <Route
        path="*"
        element={
          <UserContainer showNavAndFooter={false}>
            <NotFound />
          </UserContainer>
        }
      />
    </Routes>
  );
};

export default UserRoutes;
