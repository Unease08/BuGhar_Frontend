import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const data = [
    {
      id: "Approved",
      label: "Approved",
      value: 100,
      color: "#4caf50",
    },
    {
      id: "Pending",
      label: "Pending",
      value: 100,
      color: "#ffeb3b",
    },
  ];

  return (
    <ResponsivePie
      data={data}
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
