import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SpikeHP(props) {
   const {hpData} = props
  return (
    <ResponsiveContainer width="50%" height="100%">
        <AreaChart
          data={hpData}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[0, 2200]}/>
          <Tooltip />
          <Area type="monotone" dataKey="hp" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
  )
}
