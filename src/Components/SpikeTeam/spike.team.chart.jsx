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
  Legend,
  LabelList
} from "recharts";

const CustomBar = (props) => {
  let { team, fill } = props
  if (team === "RED") { fill = '#fa0000' }
  if (team === "BLU") { fill = '#0000e3' }
  return <Rectangle {...props} fill={fill} className="recharts-bar-rectangle" />
}
const CustomAtkBar = (props) => {
  let { team, fill } = props
  if (team === "RED") { fill = '#b90000' }
  if (team === "BLU") { fill = '#02028c' }
  return <Rectangle {...props} fill={fill} className="recharts-bar-rectangle" />
}
function CustomTooltip({ payload, label, active }) {
  if (active) {
    if (payload) {

      return (
        <div className="custom-tooltip" style={{ backgroundColor: "white", padding: "20px", border: "2px solid black", borderRadius: "10px" }}>
          <p className="label">{`Time: ${label}`}</p>
          <p className="intro">{`Target  : ${payload[0].payload.player}`}</p>
          <p className="intro">{`Attackers  : ${payload[0].value}`}</p>
          <p className="intro">{`Attacks  : ${payload[0].payload.attacks}`}</p>
          <p className="intro">{`Spike Duration  : ${payload[0].payload.duration}`}</p>
          {payload[0].payload.death ? <p className="intro">KILLED</p> : <p className="intro">Survived</p>}
          <p className="desc"></p>
        </div>
      );
    }
  }
  return null;
}
export default function SpikeTeamChart(props) {
  const { redData, blueData } = props
  return (
    <>
      <BarChart
        width={1800}
        height={400}
        data={redData}
        syncId="teamSpikes"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={['auto', 'auto']} dataKey="start" />
        <YAxis domain={[0, 16]}/>
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={0} stroke="#000" />
        <Brush dataKey="start" height={30} stroke="#8884d8" />
        <Bar dataKey="attackers" stackId="a" shape={CustomBar}>
          <LabelList style={{ fontSize: "10px" }} dataKey="death" position="middle" stroke="white" />
        </Bar>
        <Bar dataKey="atkFormat" stackId="a" shape={CustomAtkBar} stroke="white" strokeWidth="2" />
      </BarChart>
      <BarChart
        width={1800}
        height={400}
        data={blueData}
        syncId="teamSpikes"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={['auto', 'auto']} dataKey="start" />
        <YAxis domain={[0, 16]}/>
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={0} stroke="#000" />
        <Bar dataKey="attackers" stackId="a" shape={CustomBar}>
          <LabelList style={{ fontSize: "10px" }} dataKey="death" position="middle" stroke="white" />
        </Bar>
        <Bar dataKey="atkFormat" stackId="a" shape={CustomAtkBar} stroke="white" strokeWidth="2" />
      </BarChart>
    </>
  )
}
