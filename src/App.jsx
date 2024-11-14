import React, { createContext, useState, useEffect } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { AdminNavbar, AdminSideBar } from "./admin/scenes";
import { CompanyNavbar, CompanySideBar } from "./company/scenes";
import UserRoute from "./routes/UserRoute";
import AdminRouter from "./AdminRouter";
import { Toaster } from "react-hot-toast";
import CompanyRouter from "./CompanyRouter";
import AuthRoutes from "./routes/AuthRoutes";
import { jwtDecode } from "jwt-decode";

export const ToggledContext = createContext(null);

function App() {
  const [theme, colorMode] = useMode();
  const [toggled, setToggled] = useState(false);
  const [routeType, setRouteType] = useState("auth");

  const values = { toggled, setToggled };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;
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
          duration: 4000,
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
                {routeType === "admin" ? (
                  <>
                    <AdminSideBar />
                    <Box
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        maxWidth: "100%",
                      }}
                    >
                      <AdminNavbar />
                      <Box
                        sx={{ overflowY: "auto", flex: 1, maxWidth: "100%" }}
                      >
                        <AdminRouter />
                      </Box>
                    </Box>
                  </>
                ) : (
                  <>
                    <CompanySideBar />
                    <Box
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        maxWidth: "100%",
                      }}
                    >
                      <CompanyNavbar />
                      <Box
                        sx={{ overflowY: "auto", flex: 1, maxWidth: "100%" }}
                      >
                        <CompanyRouter />
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
            </ToggledContext.Provider>
          </ThemeProvider>
        </ColorModeContext.Provider>
      )}
    </>
  );
}

export default App;
