import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "@mui/material";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();

  const data = [
    { month: "Jan", "hot dog": 13 },
    { month: "Feb", "hot dog": 5 },
    { month: "Mar", "hot dog": 10 },
    { month: "Apr", "hot dog": 13 },
    { month: "May", "hot dog": 8 },
    { month: "June", "hot dog": 6 },
    { month: "July", "hot dog": 8 },
    { month: "Aug", "hot dog": 9 },
    { month: "Sept", "hot dog": 11 },
    { month: "Oct", "hot dog": 9 },
    { month: "Nov", "hot dog": 1 },
    { month: "Dec", "hot dog": 7 },
  ];

  return (
    <ResponsiveBar
      data={data}
      keys={["hot dog"]}
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
        legend: isDashboard ? undefined : "Hot Dog Sales",
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
