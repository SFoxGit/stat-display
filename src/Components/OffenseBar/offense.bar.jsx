import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

export default function OffenseBar(props) {
    const summaryStats = props.summaryStats
    const [data, setData] = useState([])
    useEffect(() => {
        const newArr = []
        summaryStats.forEach(person => {
            if (person.offTiming) {

                newArr.push({
                        name: person.player, 
                        early: person.offTiming.early,
                        0.33: person.offTiming.one,
                        0.67: person.offTiming.two,
                        1: person.offTiming.three,
                        1.5: person.offTiming.four,
                        2: person.offTiming.five,
                        over: person.offTiming.six,
                    })
                }
        })
        setData([...newArr])
    }, [summaryStats])
  return (
    <BarChart
      width={800}
      height={500}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="early" stackId="a" fill="#ffef63" />
      <Bar dataKey="0.33" stackId="a" fill="#63e2f0" />
      <Bar dataKey="0.67" stackId="a" fill="#15c9dd" />
      <Bar dataKey="1" stackId="a" fill="#0f8d9a" />
      <Bar dataKey="1.5" stackId="a" fill="#0b646e" />
      <Bar dataKey="2" stackId="a" fill="#063c42" />
      <Bar dataKey="over" stackId="a" fill="#000000" />
    </BarChart>
  );
}
