import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Header, StatBox, PieChart, BarChart } from "../../components";
import {
  Person,
  ReceiptOutlined,
  SummarizeOutlined,
  ApartmentRounded,
} from "@mui/icons-material";
import { tokens } from "../../../theme";
import { useEffect, useState } from "react";
import api from "../../../library/Api";

function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isXlDevices = useMediaQuery("(min-width: 1260px)");
  const isMdDevices = useMediaQuery("(min-width: 724px)");
  const isXsDevices = useMediaQuery("(max-width: 436px)");

  // State for storing fetched data
  const [dashboardData, setDashboardData] = useState({
    total_users: 0,
    total_companies: 0,
    total_programs: 0,
    total_reports: 0,
    verified_companies: 0,
    unverified_companies: 0,
  });

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/admin/dashboard");
        console.log(response.data);

        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="DASHBOARD" subtitle="Welcome to your Admin dashboard" />
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={
          isXlDevices
            ? "repeat(12, 1fr)"
            : isMdDevices
            ? "repeat(6, 1fr)"
            : "repeat(3, 1fr)"
        }
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={dashboardData.total_users}
            subtitle="Users"
            icon={
              <Person
                sx={{ color: colors.blueAccent[500], fontSize: "40px" }}
              />
            }
            sx={{ ml: "50px" }} // Add margin-left here
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={dashboardData.total_companies}
            subtitle="Companies"
            icon={
              <ApartmentRounded
                sx={{ color: colors.blueAccent[500], fontSize: "50px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={dashboardData.total_programs}
            subtitle="Programs"
            icon={
              <ReceiptOutlined
                sx={{ color: colors.blueAccent[500], fontSize: "50px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={dashboardData.total_reports}
            subtitle="Reports"
            icon={
              <SummarizeOutlined
                sx={{ color: colors.blueAccent[500], fontSize: "50px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn={
            isXlDevices ? "span 6" : isMdDevices ? "span 3" : "span 3"
          }
          gridRow="span 3"
          bgcolor={colors.primary[400]}
        >
          <Box px="10px">
            <Typography variant="h5" fontWeight="600" mt="15px">
              Company Verification
            </Typography>
          </Box>
          <Box height="400px">
            <PieChart isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn={
            isXlDevices ? "span 6" : isMdDevices ? "span 3" : "span 3"
          }
          gridRow="span 3"
          bgcolor={colors.primary[400]}
        >
          <Box px="10px">
            <Typography variant="h5" fontWeight="600" mt="15px">
              User Registration
            </Typography>
          </Box>
          <Box height="400px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
