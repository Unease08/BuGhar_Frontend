import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = Boolean(localStorage.getItem("access_token")); // Check for the presence of the access token or other auth indicators

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
    