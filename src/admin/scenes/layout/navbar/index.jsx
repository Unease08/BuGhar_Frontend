import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  IconButton,
  InputBase,
  useMediaQuery,
  useTheme,
  Popover,
  Typography,
  Button,
} from "@mui/material";
import { tokens, ColorModeContext } from "../../../../theme";
import {
  MenuOutlined,
  PersonOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { ToggledContext } from "../../../../App";
import toast from "react-hot-toast";

const AdminNavbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { toggled, setToggled } = useContext(ToggledContext);
  const isMdDevices = useMediaQuery("(max-width:768px)");
  const isXsDevices = useMediaQuery("(max-width:466px)");
  const colors = tokens(theme.palette.mode);

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_type");

    const logoutMessage = "Logout successful!";
    sessionStorage.setItem("toastMessage", logoutMessage);

    window.location.href = "/auth/login";
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton
          sx={{ display: `${isMdDevices ? "flex" : "none"}` }}
          onClick={() => setToggled(!toggled)}
        >
          <MenuOutlined />
        </IconButton>
        <Box
          display="flex"
          alignItems="center"
          bgcolor={colors.primary[400]}
          borderRadius="3px"
          sx={{ display: `${isXsDevices ? "none" : "flex"}` }}
        >
          <InputBase placeholder="Search" sx={{ ml: 2, flex: 1 }} />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchOutlined />
          </IconButton>
        </Box>
      </Box>

      <Box>
        <IconButton onClick={handlePopoverOpen}>
          <PersonOutlined />
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Box p={2}>
            <Typography variant="subtitle1" mb={1}>
              User Options
              <hr className="mt-2" />
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogout}
              fullWidth
            >
              Logout
            </Button>
          </Box>
        </Popover>
      </Box>
    </Box>
  );
};

export default AdminNavbar;
