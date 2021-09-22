import { width } from '@material-ui/system';
import React, { useEffect } from 'react'
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter
} from "recharts";

export default function PlayerChart(props) {
  const { teamSpikes } = props
  const data = teamSpikes
  const getScatterOne = data => {
    return data.deathTime || null
  }
  const getScatterTwo = data => {
    return data.playerSurvive || null
  }
  const getBarValues = data => {
    return [data.firstHit, data.duration]
  }
  const getTest = data => {
    if (data.duration) {
      return [data.start * 2, data.duration]
    } else { return null }
  }
  return (
    <div style={{backgroundColor: "grey", width: "100%"}}>

      <ComposedChart
        width={1400}
        height={600}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="start" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" /> */}
        <Bar dataKey={getBarValues} barSize={20} fill="#413ea0" />
        {/* <Line type="monotone" dataKey="uv" stroke="#ff7300" /> */}
        <Scatter name="survive" dataKey={getScatterTwo} fill="green" shape="cross" />
        <Scatter name="attack" dataKey="playerFirst" fill="yellow" />
        <Scatter name="attack2" dataKey="playerSecond" fill="yellow" />
        <Scatter name="kill" dataKey={getScatterOne} fill="black" shape="star" />
        <Scatter name="death" dataKey="playerDeath" fill="brown" shape="wye" />
      </ComposedChart>
    </div>
  )
}
