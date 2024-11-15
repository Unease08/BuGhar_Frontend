import React, { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Header, StatBox, PieChart, BarChart } from "../../components";
import {
  ReceiptOutlined,
  SummarizeOutlined,
  MonetizationOnOutlined,
  EmojiEventsOutlined,
} from "@mui/icons-material";
import { tokens } from "../../../theme";
import api from "../../../library/Api";

function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isXlDevices = useMediaQuery("(min-width: 1260px)");
  const isMdDevices = useMediaQuery("(min-width: 724px)");
  const isXsDevices = useMediaQuery("(max-width: 436px)");

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/company/dashboard");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <Typography>Loading...</Typography>;
  }

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
            title={data.program_count}
            subtitle="Program"
            icon={
              <ReceiptOutlined
                sx={{ color: colors.blueAccent[500], fontSize: "40px" }}
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
            title={data.report_count}
            subtitle="Reports"
            icon={
              <SummarizeOutlined
                sx={{ color: colors.blueAccent[500], fontSize: "40px" }}
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
            title={data.reward_count}
            subtitle="No. of reward"
            icon={
              <EmojiEventsOutlined
                sx={{ color: colors.blueAccent[500], fontSize: "40px" }}
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
            title={data.total_rewards_paid}
            subtitle="Total Reward (in Rs.)"
            icon={
              <MonetizationOnOutlined
                sx={{ color: colors.blueAccent[500], fontSize: "40px" }}
              />
            }
          />
        </Box>

        {/* Graph and Barchart */}

        <Box
          gridColumn={
            isXlDevices ? "span 6" : isMdDevices ? "span 3" : "span 3"
          }
          gridRow="span 3"
          bgcolor={colors.primary[400]}
        >
          <Box px="10px">
            <Typography variant="h5" fontWeight="600" mt="15px">
              Pie Chart
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
              Bar Chart
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
