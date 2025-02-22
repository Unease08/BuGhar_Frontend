import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { tokens } from "../../../../theme";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import {
  DashboardOutlined,
  MenuOutlined,
  ApartmentRounded,
  FeedOutlined,
  PolicyOutlined,
  PeopleAltOutlined,
} from "@mui/icons-material";
import avatar from "../../../assets/images/avatar.png";
import bughar from "../../../assets/images/bughar.png";
import Item from "./Item";
import { ToggledContext } from "../../../../App";
import api from "../../../../library/Api"
import config from "../../../../config";

const AdminSideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { toggled, setToggled } = useContext(ToggledContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    profile_picture: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await api.get("/user/details/");
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchUserDetails();
  }, []);

  const imageUrl = userData.profile_picture
    ? `${config.BASE_URL}/${userData.profile_picture}`
    : "https://saugat-nepal.com.np/assets/img/profile-img.png";

  return (
    <Sidebar
      backgroundColor={colors.primary[400]}
      rootStyles={{
        border: 0,
        height: "100%",
      }}
      collapsed={collapsed}
      onBackdropClick={() => setToggled(false)}
      toggled={toggled}
      breakPoint="md"
    >
      <Menu
        menuItemStyles={{
          button: { ":hover": { background: "transparent" } },
        }}
      >
        <MenuItem
          rootStyles={{
            margin: "10px 0 20px 0",
            color: colors.gray[100],
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                alignItems="center"
                gap="12px"
                sx={{ transition: ".3s ease" }}
              >
                <img
                  style={{ borderRadius: "8px" }}
                  src={bughar}
                  alt="Bughar"
                />
              </Box>
            )}
            <IconButton onClick={() => setCollapsed(!collapsed)}>
              <MenuOutlined />
            </IconButton>
          </Box>
        </MenuItem>
      </Menu>
      {!collapsed && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            mb: "25px",
          }}
        >
          <Avatar
            alt="avatar"
            src={imageUrl}
            sx={{ width: "100px", height: "100px" }}
          />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3" fontWeight="bold" color={colors.gray[100]}>
              {userData.first_name} {userData.last_name}
            </Typography>
          </Box>
        </Box>
      )}

      <Box mb={5} pl={collapsed ? undefined : "5%"}>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Dashboard"
            path="/dashboard"
            colors={colors}
            icon={<DashboardOutlined />}
          />
        </Menu>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Users"
            path="/users"
            colors={colors}
            icon={<PeopleAltOutlined />}
          />

          <Item
            title="Company"
            path="/company"
            colors={colors}
            icon={<ApartmentRounded />}
          />
          <Item
            title="Vulnerability"
            path="/vulnerability"
            colors={colors}
            icon={<PolicyOutlined />}
          />
          <Item
            title="Logs"
            path="/logs"
            colors={colors}
            icon={<FeedOutlined />}
          />
        </Menu>
      </Box>
    </Sidebar>
  );
};

export default AdminSideBar;
