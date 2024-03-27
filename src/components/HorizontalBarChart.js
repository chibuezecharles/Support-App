import React from "react";
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const HorizontalBarChart = () => {
  const data = [
    { name: "Criminal Cases", value: 520 },
    { name: "Civil Cases", value: 450 },
    { name: "Asset Freezing Order", value: 673 },
    { name: "Remand Order", value: 223 },
    { name: "Court of Appeal", value: 420 },
    { name: "Supreme Court Cases", value: 330 },
  ];
  const colors = [
    "#FFC34F",
    "#FA8DFF",
    "#5BBDFF",
    "#FF565B",
    "#A4CFE9",
    "#63FF60",
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={400}
        height={300}
        data={data}
        layout="vertical" // This makes the chart horizontal
        margin={{ top: 20, right: 20, left: -40, bottom: 5 }}
        barCategoryGap={10} // Adjust the gap between the bars
        barGap={5} // Adjust the gap between the groups of bars (if there are multiple bars in a group)
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis tick={false} tickLine={false} axisLine={false} type="number" />
        <YAxis
          tick={false}
          tickLine={false}
          axisLine={false}
          dataKey="name"
          type="category"
        />
        <Bar
          dataKey="value"
          fill="#8884d8"
          barSize={40}
          background={{ fill: "#e6e7e8" }}
        >
          <LabelList
            dataKey="name"
            position="insideStart"
            fill="#444448"
            fontWeight={"bold"}
          />
          <LabelList
            dataKey="value"
            position="right"
            fill="8884d8"
            offset={10}
          />
          {colors.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} b />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HorizontalBarChart;
