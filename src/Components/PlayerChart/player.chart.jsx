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
  const { playerDeath, playerSurvive, targetDeath, teamSpikes } = props
  const data = teamSpikes
  const getScatterOne = data => {
    return data.deathTime || null
  }
  const getBarValues = data => {
    return [data.firstHit, data.duration] 
  }
  useEffect(() => {
    playerDeath.forEach(element => data.push({start: element.start, playerDeath: element.duration}))
    playerSurvive.forEach(element => data.push({start: element.start, playerSurvive: element.duration}))
    targetDeath.forEach(element => data.push({start: element.start, targetDeath: element.deathTime}))
    data.forEach(element => element.start = parseFloat(element.start))
  }, [playerDeath, playerSurvive, targetDeath, data])
  return (
    <ComposedChart
      width={1100}
      height={400}
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
      <Scatter dataKey={getScatterOne} fill="red" />
    </ComposedChart>
  )
}
