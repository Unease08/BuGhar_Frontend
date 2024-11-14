// import React from "react";
// import { Navigate } from "react-router-dom";
// import {jwtDecode} from "jwt-decode"; // Default import for jwt-decode

// const PrivateRoute = ({ element, allowedRoles }) => {
//   const token = localStorage.getItem("access_token");

//   // Check if the user is authenticated
//   if (!token) {
//     return <Navigate to="/auth/login" />;
//   }

//   try {
//     const decodedToken = jwtDecode(token);
//     const userRole = decodedToken.role; // Extract the role from the token payload

//     // Check if the role is allowed
//     if (allowedRoles.includes(userRole)) {
//       return element;
//     } else {
//       return <Navigate to="/unauthorized" />; // Navigate to an unauthorized page if role doesn't match
//     }
//   } catch (error) {
//     // If decoding fails, force a logout or redirect to login
//     localStorage.removeItem("access_token");
//     return <Navigate to="/login" />;
//   }
// };

// export default PrivateRoute;

import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = Boolean(localStorage.getItem("access_token")); 

  return isAuthenticated ? element : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
