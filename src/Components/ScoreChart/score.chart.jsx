import React from 'react';
import { Container } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ScoreChart(props) {
  const scoreLog = props.scoreLog

  return (
    <Container>
      <LineChart
        width={500}
        height={300}
        data={scoreLog}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="red" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="blue" stroke="#82ca9d" />
      </LineChart>
    </Container>
  );
}