import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import api from "../../library/Api";

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/admin/dashboard");
        console.log(response.data);
        const { verified_companies, unverified_companies } = response.data;

        setPieData([
          {
            id: "Approved",
            label: "Approved",
            value: verified_companies,
            color: "#4caf50",
          },
          {
            id: "Pending",
            label: "Pending",
            value: unverified_companies,
            color: "#ffeb3b",
          },
        ]);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <ResponsivePie
      data={pieData}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={{ datum: "data.color" }}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.gray[100]}
      enableArcLabels={false}
      tooltip={({ datum: { id, value, color } }) => (
        <div
          style={{
            padding: "5px",
            color: "#000",
            background: "white",
            borderRadius: "5px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.15)",
          }}
        >
          <strong>{id}</strong>: {value}
        </div>
      )}
      legends={[
        {
          anchor: "top-right",
          direction: "column",
          justify: false,
          translateX: 0,
          translateY: -40,
          itemsSpacing: 10,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: colors.gray[100],
          symbolSize: 10,
          symbolShape: "circle",
        },
      ]}
    />
  );
};

export default PieChart;
