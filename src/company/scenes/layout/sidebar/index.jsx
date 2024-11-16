import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import api from "../../../../library/Api";
import { tokens } from "../../../../theme";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import bughar from "../../../assets/images/bughar.png";

import {
  ContactsOutlined,
  DashboardOutlined,
  MenuOutlined,
  PersonOutlined,
  ReceiptOutlined,
  SummarizeOutlined,
  MonetizationOnOutlined,
} from "@mui/icons-material";
import Item from "./Item";
import { ToggledContext } from "../../../../App";
import config from "../../../../config";

const CompanySideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { toggled, setToggled } = useContext(ToggledContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [companyData, setCompanyData] = useState({
    company_name: "",
    company_logo: "",
  });

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await api.get("/company/company-detail/");
        if (Array.isArray(response.data) && response.data.length > 0) {
          setCompanyData(response.data[0]);
        } else {
          console.error("No company data found");
        }
      } catch (error) {
        console.error("Failed to fetch company details", error);
      }
    };

    fetchCompanyDetails();
  }, []);

  const imageUrl = companyData?.company_logo
    ? `${config.BASE_URL}/${companyData.company_logo}`
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
            alt="User Avatar"
            src={imageUrl}
            sx={{ width: "100px", height: "100px" }}
          />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3" fontWeight="bold" color={colors.gray[100]}>
              {companyData.company_name}
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
            title="Verify Company"
            path="/company-verification"
            colors={colors}
            icon={<ContactsOutlined />}
          />
          <Item
            title="Program"
            path="/program"
            colors={colors}
            icon={<ReceiptOutlined />}
          />
          <Item
            title="Report"
            path="/report"
            colors={colors}
            icon={<SummarizeOutlined />}
          />
          <Item
            title="Company Info"
            path="/company-info"
            colors={colors}
            icon={<PersonOutlined />}
          />
          <Item
            title="Reward"
            path="/reward"
            colors={colors}
            icon={<MonetizationOnOutlined />}
          />
        </Menu>
      </Box>
    </Sidebar>
  );
};

export default CompanySideBar;
