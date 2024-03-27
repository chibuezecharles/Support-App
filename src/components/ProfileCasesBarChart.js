import { Box } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    "High Profile Cases": 4000,
    "Low Profile Cases": 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    "High Profile Cases": 3000,
    "Low Profile Cases": 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    "High Profile Cases": 2000,
    "Low Profile Cases": 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    "High Profile Cases": 2780,
    "Low Profile Cases": 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    "High Profile Cases": 1890,
    "Low Profile Cases": 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    "High Profile Cases": 2390,
    "Low Profile Cases": 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    "High Profile Cases": 3490,
    "Low Profile Cases": 4300,
    amt: 2100,
  },
  {
    name: "Page G",
    "High Profile Cases": 3490,
    "Low Profile Cases": 4300,
    amt: 2100,
  },
  {
    name: "Page G",
    "High Profile Cases": 3490,
    "Low Profile Cases": 4300,
    amt: 2100,
  },
  {
    name: "Page G",
    "High Profile Cases": 3490,
    "Low Profile Cases": 4300,
    amt: 2100,
  },
  {
    name: "Page G",
    "High Profile Cases": 3490,
    "Low Profile Cases": 4300,
    amt: 2100,
  },
];

const ProfileCasesBarChart = () => {
  return (
    <Box
      as={ResponsiveContainer}
      sx={{
        "& .recharts-legend-item-text": {
          color: "black !important",
        },
      }}
      width={["50rem !important", "50rem !important", "100% !important", "100% !important"]}
      overflowX={"scroll"}
      height="100%"
    >
      <BarChart
        data={data}
        style={{ top: "-25px" }}
        barSize={10}
        barCategoryGap={4}
        margin={{ top: 50, bottom: 0, left: 20, right: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar
          dataKey="Low Profile Cases"
          fill="#CD73D1"
          radius={[50, 50, 0, 0]}
        />
        <Bar
          dataKey="High Profile Cases"
          fill="#FFC34F"
          radius={[50, 50, 0, 0]}
        />
        "Low Profile Cases"
        <Legend
          wrapperStyle={{
            padding: ".5rem",
            borderTop: "1px solid #E8E8E8",
            width: "100%",
            left: "0 !important",
            bottom: "-20px",
            color: "black !important",
          }}
          iconType="rect"
          iconSize={20}
        />
      </BarChart>
    </Box>
  );
};

export default ProfileCasesBarChart;
