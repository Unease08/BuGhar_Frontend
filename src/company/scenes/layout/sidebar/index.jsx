import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { tokens } from "../../../../theme";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import {
  ContactsOutlined,
  DashboardOutlined,
  MenuOutlined,
  PeopleAltOutlined,
  PersonOutlined,
  ReceiptOutlined,
  SummarizeOutlined,
  ExpandMoreOutlined,
  ExpandLessOutlined,
  FiberManualRecord,
  LockOpenRounded,
  PendingActionsRounded,
  Lock,
  CancelRounded,
} from "@mui/icons-material";
import { CgDanger } from "react-icons/cg";
import { GrStatusInfo } from "react-icons/gr";
import avatar from "../../../assets/images/avatar.png";
import bughar from "../../../assets/images/bughar.png";
import Item from "./Item";
import { ToggledContext } from "../../../../App";
import { Link } from "react-router-dom";

const CompanySideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false); // State to control report dropdown
  const [isImpactOpen, setIsImpactOpen] = useState(false); // State to control By Impact dropdown
  const [isStatusOpen, setIsStatusOpen] = useState(false); // State to control By Status dropdown
  const { toggled, setToggled } = useContext(ToggledContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleReportClick = () => {
    setIsReportOpen(!isReportOpen); // Toggle dropdown for Report
  };

  const handleImpactClick = () => {
    setIsImpactOpen(!isImpactOpen); // Toggle dropdown for By Impact
    setIsStatusOpen(false); // Close By Status dropdown when By Impact is opened
  };

  const handleStatusClick = () => {
    setIsStatusOpen(!isStatusOpen); // Toggle dropdown for By Status
    setIsImpactOpen(false); // Close By Impact dropdown when By Status is opened
  };

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
                <img style={{ borderRadius: "8px" }} src={bughar} alt="Argon" />
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
            src={avatar}
            sx={{ width: "100px", height: "100px" }}
          />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3" fontWeight="bold" color={colors.gray[100]}>
              Company Anish
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
            path="/team"
            colors={colors}
            icon={<PeopleAltOutlined />}
          />
          <Item
            title="Company Info"
            path="/company-info"
            colors={colors}
            icon={<PersonOutlined />}
          />
          <Item
            title="Company Verification"
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

          {/* Report with dropdown for Impact and Status */}
          <MenuItem onClick={handleReportClick} icon={<SummarizeOutlined />}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography color={colors.gray[100]}>
                <Link to="/report">Report</Link>
              </Typography>
              {isReportOpen ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
            </Box>
          </MenuItem>

          {isReportOpen && (
            <Menu
              menuItemStyles={{
                button: {
                  paddingLeft: "50px", // Reduced padding for sub-items
                  margin: "0",
                  height: "30px",
                  ":hover": {
                    color: "#868dfb",
                    background: "transparent",
                    transition: ".4s ease",
                  },
                },
              }}
            >
              {/* By Impact dropdown */}
              <MenuItem onClick={handleImpactClick}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography color={colors.gray[100]}>
                    <Link to="/report">
                      <div className="flex items-center gap-2">
                        <i className="text-lg">
                          <CgDanger />
                        </i>
                        <span>By Impact</span>
                      </div>
                    </Link>
                  </Typography>
                  {isImpactOpen ? (
                    <ExpandLessOutlined />
                  ) : (
                    <ExpandMoreOutlined />
                  )}
                </Box>
              </MenuItem>

              {isImpactOpen && (
                <Menu
                  menuItemStyles={{
                    button: {
                      paddingLeft: "50px", // Reduced padding for sub-items
                      margin: "0",
                      height: "30px",
                      ":hover": {
                        color: "#868dfb",
                        background: "transparent",
                        transition: ".4s ease",
                      },
                    },
                  }}
                >
                  <Item
                    title={<span style={{ color: "white" }}>Critical</span>}
                    path="/report" // Add a path for navigation
                    colors={colors}
                    icon={<FiberManualRecord sx={{ color: "#B91C1C" }} />} // Change icon color to red
                  />
                  <Item
                    title={<span style={{ color: "white" }}>High</span>}
                    path="/report" // Add a path for navigation
                    colors={colors}
                    icon={<FiberManualRecord sx={{ color: "#EA580C" }} />} // Change icon color to red
                  />
                  <Item
                    title={<span style={{ color: "white" }}>Moderate</span>}
                    path="/report" // Add a path for navigation
                    colors={colors}
                    icon={<FiberManualRecord sx={{ color: "#CA8A04" }} />} // Change icon color to red
                  />
                  <Item
                    title={<span style={{ color: "white" }}>Low</span>}
                    path="/report" // Add a path for navigation
                    colors={colors}
                    icon={<FiberManualRecord sx={{ color: "#16A34A" }} />} // Change icon color to red
                  />
                  <Item
                    title={
                      <span style={{ color: "white" }}>Informational</span>
                    }
                    path="/report" // Add a path for navigation
                    colors={colors}
                    icon={<FiberManualRecord sx={{ color: "#2563EB" }} />} // Change icon color to red
                  />
                </Menu>
              )}

              {/* By Status dropdown */}
              <MenuItem onClick={handleStatusClick}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography color={colors.gray[100]}>
                    <Link to="/report">
                      <div className="flex items-center gap-2">
                        <i className="text-lg">
                          <GrStatusInfo />
                        </i>
                        <span>By Status</span>
                      </div>
                    </Link>
                  </Typography>
                  {isStatusOpen ? (
                    <ExpandLessOutlined />
                  ) : (
                    <ExpandMoreOutlined />
                  )}
                </Box>
              </MenuItem>

              {isStatusOpen && (
                <Menu
                  menuItemStyles={{
                    button: {
                      paddingLeft: "50px", // Reduced padding for sub-items
                      margin: "0",
                      height: "30px",
                      ":hover": {
                        background: "transparent",
                        transition: ".4s ease",
                      },
                    },
                  }}
                >
                  <Item
                    title={<span style={{ color: "white" }}>Open</span>}
                    colors={colors}
                    path="/report" // Add a path for navigation
                    icon={<LockOpenRounded sx={{ color: "white" }} />} // Icon for Status Level 1
                  />
                  <Item
                    title={<span style={{ color: "white" }}>In Progress</span>}
                    colors={colors}
                    icon={<PendingActionsRounded />} // Icon for Status Level 2
                  />
                  <Item
                    title={<span style={{ color: "white" }}>Closed</span>}
                    colors={colors}
                    icon={<Lock />} // Icon for Status Level 3
                  />
                  <Item
                    title={<span style={{ color: "white" }}>Rejected</span>}
                    colors={colors}
                    icon={<CancelRounded />} // Icon for Status Level 4
                  />
                </Menu>
              )}
            </Menu>
          )}
        </Menu>
      </Box>
    </Sidebar>
  );
};

export default CompanySideBar;
