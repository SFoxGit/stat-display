import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function ScoreChart(props) {
  const scoreLog = props.scoreLog

  return (
    <ResponsiveContainer  width="100%" height={400} style={{padding: "0px"}}>
      <LineChart
        data={scoreLog}
        
        margin={{
          top: 5,
          right: 5,
          left: 5,
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
          strokeWidth={2}
          stroke="#0a07f5"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="red" stroke="#f50713" activeDot={{ r: 8 }} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer >
  );
}
