import React from 'react'
import {
    BarChart,
    Bar,
    Brush,
    ReferenceLine,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Rectangle,
    Legend
} from "recharts";

const CustomBar = (props) => {
    let {team, fill} = props
    if (team === "RED") {fill='#fa0000'}
    if (team === "BLU") {fill='#0000e3'}
    return <Rectangle {...props} fill={fill} className="recharts-bar-rectangle" />
}

export default function SpikeTeamChart(props) {
    const { spikeData } = props
    return (
        <BarChart
            width={1800}
            height={500}
            data={spikeData}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 'dataMax']} dataKey="start" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: "40px" }} />
            <ReferenceLine y={0} stroke="#000" />
            <Brush dataKey="start" height={30} stroke="#8884d8" />
            <Bar dataKey="attackers" shape={CustomBar} />
        </BarChart>
    )
}
