import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';


const columns = [
  { field: 'id', headerName: '#', type: 'number', width: 120, },
  { field: 'player', headerName: 'player', width: 150, },
  { field: 'team', headerName: 'team', width: 120, },
  { field: 'start', headerName: 'Start', type: 'number', width: 120, },
  { field: 'attackers', headerName: 'Attackers', type: 'number', width: 120, },
  { field: 'attacks', headerName: 'Attacks', type: 'number', width: 120, },
  { field: 'duration', headerName: 'Duration', type: 'number', width: 120, },
  { field: 'hpStart', headerName: 'HP Start', type: 'number', width: 120, },
  { field: 'hpLoss', headerName: 'HP Loss', type: 'number', width: 120, },
  { field: 'avail', headerName: 'G.Avail', type: 'number', width: 120, },
  { field: 'used', headerName: 'G.Used', type: 'number', width: 120, },
  { field: 'window', headerName: 'Dam Window', type: 'number', width: 120, },
  { field: 'death', headerName: 'Death', type: 'number', width: 120, }
]

export default function SpikeTable(props) {
  const { matchData, setHpData, setAtkData } = props
  const [tableDisplay, setTableDisplay] = useState([])
  const handleSelectSpike = (row) => {
    const spikeIndex = matchData.data.spike_hp.findIndex(element => element.id === row.id)
    const spikeLogIndex = matchData.data.spike_log.findIndex(element => element.id === row.id)
    const newAtkLog = matchData.data.spike_log[spikeLogIndex].atkLog
    for (let i = newAtkLog.length-1; i >= 0; i--) {
      if (!newAtkLog[i].hitTime) {newAtkLog[i].hitTime = newAtkLog[i].time}
      newAtkLog[i].id = i
    }
    console.log(matchData.data.spike_log[spikeLogIndex].atkLog)
    setHpData(matchData.data.spike_hp[spikeIndex].hpLog)
    setAtkData(newAtkLog)
  }
 
  // const tableHeadStyle = { color: "white", fontSize: "18px", textAlign: "center" }
  // const tableBodyStyle = { color: "white", fontWeight: "bold", textAlign: "center", fontSize: "12px" }

  // const blueTeam = {
  //   // background: "rgb(2,0,36)",
  //   background: "linear-gradient(0deg, rgba(0,0,84,1) 31%, rgba(0,0,143,1) 60%, rgba(0,0,227,1) 91%)",
  //   textShadow: "2px 2px black"
  // };

  // const redTeam = {
  //   background: "linear-gradient(0deg, rgba(111,0,0,1) 48%, rgba(167,0,0,1) 81%, rgba(250,0,0,1) 100%)",
  //   textShadow: "2px 2px black"
  // };
  useEffect(() => {
    const newArr = []
    const reversedArr = newArr.reverse()
    for (var i = matchData.data.spike_summary.length - 1;  i >= 0; i--) {
      const spikeID = matchData.data.spike_summary[i].id
      const startHP = matchData.data.spike_hp.findIndex(element => element.id === spikeID)
      newArr.push({
        id: spikeID,
        player: matchData.data.spike_summary[i].player,
        team: matchData.data.spike_summary[i].team,
        start: matchData.data.spike_summary[i].start,
        attackers: matchData.data.spike_summary[i].attackers,
        attacks: matchData.data.spike_summary[i].attacks,
        duration: matchData.data.spike_summary[i].duration,
        hpStart: startHP === -1 ? 999 : matchData.data.spike_hp[startHP].hpLog[0].hp,
        hpLoss: parseFloat(matchData.data.spike_summary[i].hpLost).toFixed(2),
        avail: matchData.data.spike_summary[i].greensAvailable,
        used: matchData.data.spike_summary[i].greensUsed,
        window: matchData.data.spike_summary[i].hitWindow ? parseFloat(matchData.data.spike_summary[i].hitWindow).toFixed(2) : null,
        death: matchData.data.spike_summary[i].death
      })
    }
    setTableDisplay([...reversedArr])
  }, [matchData])
  return (
    
    <div style={{ height: "80vh", width: '100%', backgroundColor: "white" }}>
      {tableDisplay.length ? <DataGrid
        rows={tableDisplay}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick={true}
        onRowClick={(rowData) => handleSelectSpike(rowData.row)}
      /> : null}
    </div>
  )
}
