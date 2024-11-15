import React, { useState, useContext, useEffect } from "react";
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
  DarkModeOutlined,
  LightModeOutlined,
  MenuOutlined,
  NotificationsOutlined,
  PersonOutlined,
  SearchOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { ToggledContext } from "../../../../App";
import api from "../../../../library/Api";
import toast from "react-hot-toast";

const CompanyNavbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { toggled, setToggled } = useContext(ToggledContext);
  const isMdDevices = useMediaQuery("(max-width:768px)");
  const isXsDevices = useMediaQuery("(max-width:466px)");
  const colors = tokens(theme.palette.mode);

  const [anchorEl, setAnchorEl] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(""); 

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const fetchVerificationStatus = async () => {
    try {
      const response = await api.get("/company/verification-status");
      setVerificationStatus(response.data.verification_status);
      setCurrentStatus(response.data.current_status); // Set the current status
    } catch (error) {
      console.error("Error fetching verification status:", error);
    }
  };

  useEffect(() => {
    fetchVerificationStatus(); 
  }, []);

 
  const getStatusStyles = (status) => {
    switch (status) {
      case "approved":
        return { backgroundColor: "green", color: "white" };
      case "pending":
        return { backgroundColor: "orange", color: "white" };
      case "submitted":
        return { backgroundColor: "blue", color: "white" };
      case "rejected":
        return { backgroundColor: "red", color: "white" };
      default:
        return { backgroundColor: "gray", color: "white" };
    }
  };

  
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
     
      {!verificationStatus && (
        <div
          className="fixed top-2 right-16 z-50 mr-32 -translate-x-1/2 bg-orange-400 p-1 drop-shadow-2xl max-sm:w-11/12"
          id="gdpr"
        >
          <div className="flex items-center justify-between gap-6 text-sm">
            <div className="content-left pl-4 text-black text-md">
              PLEASE VERIFY YOUR COMPANY TO ADD PROGRAM !!!
            </div>
            <Link to="/company-verification">
              <div className="content-right text-end">
                <button className="cursor-pointer rounded-full bg-n-11 px-4 py-2 text-white">
                  Verify
                </button>
              </div>
            </Link>
          </div>
        </div>
      )}

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
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
          <p
            className="flex justify-end items-center px-2 py-0.5 rounded-full mr-2"
            style={{
              ...getStatusStyles(currentStatus),
              fontWeight: "bold",
            }}
          >
            {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
          </p>
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

export default CompanyNavbar;
