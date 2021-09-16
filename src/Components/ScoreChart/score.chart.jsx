import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default function ScoreChart(props) {
  const scoreLog = props.scoreLog

  return (
    <LineChart
      width={600}
      height={500}
      data={scoreLog}
      style={{background: "linear-gradient(45deg, rgba(0,0,0,1) 22%, rgba(57,57,57,1) 75%, rgba(138,138,138,1) 100%)"}}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="blue"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="red" stroke="#82ca9d" activeDot={{ r: 8 }} />
    </LineChart>
  );
}
