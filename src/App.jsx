import React, { createContext, useState, useEffect } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Navbar, SideBar } from "./admin/scenes";
import UserRoute from "./routes/UserRoute";
import AdminRouter from "./AdminRouter";
import { Toaster } from "react-hot-toast";
import CompanyRouter from "./CompanyRouter";
import AuthRoutes from "./routes/AuthRoutes";
import {jwtDecode} from "jwt-decode"; // Ensure you have this package installed

export const ToggledContext = createContext(null);

function App() {
  const [theme, colorMode] = useMode();
  const [toggled, setToggled] = useState(false);
  const [routeType, setRouteType] = useState("auth"); // Default to "auth"

  const values = { toggled, setToggled };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role; // Adjust this if your token has a different structure
        setRouteType(
          userRole === "admin"
            ? "admin"
            : userRole === "company"
            ? "company"
            : "user"
        );
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    } else {
      setRouteType("auth");
    }
  }, []);

  return (
    <>
      <Toaster
        toastOptions={{
          duration: 3000,
        }}
      />
      {routeType === "auth" ? (
        <AuthRoutes />
      ) : routeType === "user" ? (
        <UserRoute />
      ) : (
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ToggledContext.Provider value={values}>
              <Box sx={{ display: "flex", height: "100vh", maxWidth: "100%" }}>
                <SideBar />
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    maxWidth: "100%",
                  }}
                >
                  <Navbar />
                  <Box sx={{ overflowY: "auto", flex: 1, maxWidth: "100%" }}>
                    {routeType === "admin" ? (
                      <AdminRouter />
                    ) : (
                      <CompanyRouter />
                    )}
                  </Box>
                </Box>
              </Box>
            </ToggledContext.Provider>
          </ThemeProvider>
        </ColorModeContext.Provider>
      )}
    </>
  );
}

export default App;
