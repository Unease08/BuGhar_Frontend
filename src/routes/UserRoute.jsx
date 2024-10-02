import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../user/pages/Home";
import About from "../user/pages/About";
import UserContainer from "../user/components/layout/UserContainer";
import HomePage from "../user/pages/homepage/HomePage";
import PrivateRoute from "../components/auth/PrivateRoute"; // Adjust the path as needed
import NotFound from "../user/pages/NotFound";
import Profile from "../user/pages/profile/Profile";
import ChangePassword from "../user/components/login/ChangePassword";
import Programs from "../user/pages/programs/Programs";
import ProgramDetails from "../user/pages/programs/ProgramsDetails";
import ProgramReport from "../user/pages/programs/ProgramReport";

const UserRoutes = () => {
  return (
    <Routes>
      <Route
        path="/dashboard"
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
        path="/programdetails/:id"
        element={
          <UserContainer>
            <PrivateRoute element={<ProgramDetails />} />
          </UserContainer>
        }
      />
      <Route
        path="/programdetails/:id/programreport"
        element={
          <UserContainer>
            <PrivateRoute element={<ProgramReport />} />
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
