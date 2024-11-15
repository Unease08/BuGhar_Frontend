import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import api from "../../library/Api";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/company/dashboard");
        const monthDataMap = monthNames.reduce((acc, month) => {
          acc[month] = 0;
          return acc;
        }, {});

        response.data.companies_by_month.forEach((item) => {
          const monthName = monthNames[item.month - 1];
          monthDataMap[monthName] = item.total_reports;
        });

        const formattedData = Object.keys(monthDataMap).map((month) => ({
          month: month,
          "total reports": monthDataMap[month],
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching data for the bar chart:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveBar
      data={chartData}
      keys={["total reports"]}
      indexBy="month"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      colors={{ scheme: "nivo" }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Month",
        legendPosition: "middle",
        legendOffset: 32,
        tick: {
          text: {
            fill: "white",
          },
        },
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Total Reports",
        legendPosition: "middle",
        legendOffset: -40,
        tick: {
          text: {
            fill: "white",
          },
        },
      }}
      enableLabel={false}
      role="application"
      barAriaLabel={(e) =>
        `${e.id}: ${e.formattedValue} in month: ${e.indexValue}`
      }
      tooltip={({ id, value, indexValue }) => (
        <div
          style={{
            color: "#000",
            background: "white",
            padding: "5px",
            borderRadius: "3px",
          }}
        >
          <strong>{indexValue}</strong>: {id} = {value}
        </div>
      )}
      theme={{
        axis: {
          ticks: {
            text: {
              fill: "white",
            },
          },
          legend: {
            text: {
              fill: "white",
            },
          },
        },
      }}
    />
  );
};

export default BarChart;
