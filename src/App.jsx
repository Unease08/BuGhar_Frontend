import React, { createContext, useState } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Navbar, SideBar } from "./admin/scenes";

import UserRoute from "./routes/UserRoute";
import AdminRouter from "./AdminRouter";
import { Toaster } from "react-hot-toast";

export const ToggledContext = createContext(null);

function App() {
  const [theme, colorMode] = useMode();
  const [toggled, setToggled] = useState(false);
  const [isUser, setIsUser] = useState(true); // Change this state to toggle between user and admin

  const values = { toggled, setToggled };

  return (
    <>
      <Toaster
        toastOptions={{
          duration: 3000,
        }}
      />
      {isUser ? (
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
                    <AdminRouter />
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
