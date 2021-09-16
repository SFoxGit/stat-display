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
import Container from '@material-ui/core/Container';

export default function ScoreChart(props) {
  const scoreLog = props.scoreLog

  return (
    <Container maxWidth="sm" style={{padding: "0px"}}>
      <LineChart
        width={600}
        height={500}
        data={scoreLog}
        style={{ boxShadow: "7px 7px 7px black", background: "linear-gradient(45deg, rgba(0,0,0,1) 22%, rgba(57,57,57,1) 75%, rgba(138,138,138,1) 100%)" }}
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
    </Container>
  );
}
