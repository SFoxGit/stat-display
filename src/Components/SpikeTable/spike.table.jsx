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
  const { matchData } = props
  const [tableDisplay, setTableDisplay] = useState([])

 
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
      /> : null}
    </div>
    // <TableContainer style={{ boxShadow: "7px 7px 7px black" }}>
    //     <Table key="offenseTable" style={{ boxShadow: "7px 7px 5px black", fontWeight: "bolder", fontSize: "18px", background: "grey" }}>
    //         <TableHead>
    //             <TableRow style={{ textAlign: 'center', background: "linear-gradient(0deg, rgba(0,0,0,1) 31%, rgba(31,31,31,1) 60%, rgba(70,70,70,1) 91%)" }}>
    //                 <TableCell style={tableHeadStyle}>#</TableCell>
    //                 <TableCell width="20%" style={tableHeadStyle}>player</TableCell>
    //                 <TableCell style={tableHeadStyle}>team</TableCell>
    //                 <TableCell style={tableHeadStyle}>Start</TableCell>
    //                 <TableCell style={tableHeadStyle}>Attackers</TableCell>
    //                 <TableCell style={tableHeadStyle}>Attacks</TableCell>
    //                 <TableCell style={tableHeadStyle}>Duration</TableCell>
    //                 <TableCell style={tableHeadStyle}>HP Start</TableCell>
    //                 <TableCell style={tableHeadStyle}>HP Loss</TableCell>
    //                 <TableCell style={tableHeadStyle}>G. Avail</TableCell>
    //                 <TableCell style={tableHeadStyle}>G. Used</TableCell>
    //                 <TableCell style={tableHeadStyle}>Dam Window</TableCell>
    //                 <TableCell style={tableHeadStyle}>Death</TableCell>
    //             </TableRow>
    //         </TableHead>
    //         <TableBody>
    //             {tableDispaly.length ? tableDispaly.map(data => {
    //                 let teamStyle;
    //                 if (data.team === "BLU") { teamStyle = blueTeam }
    //                 if (data.team === "RED") { teamStyle = redTeam }
    //                 return (
    //                     data.otp > 0.01 ?
    //                     <TableRow style={teamStyle} key={data.player}>
    //                         <TableCell style={tableBodyStyle}>{data.player}</TableCell>
    //                         <TableCell style={tableBodyStyle}>{data.team}</TableCell>
    //                         <TableCell style={tableBodyStyle}>{data.powersets}</TableCell>
    //                         <TableCell style={tableBodyStyle}>{data.deaths}</TableCell>
    //                         <TableCell style={tableBodyStyle}>{data.targets}</TableCell>
    //                         <TableCell style={tableBodyStyle}>{data.otp > 0.01 ? (data.otp * 100).toFixed(2) + '%' : null}</TableCell>
    //                         <TableCell style={tableBodyStyle}>{data.atks}</TableCell>
    //                         <TableCell style={tableBodyStyle}>{data.atksOn}</TableCell>
    //                         <TableCell style={tableBodyStyle}>{data.atksOff}</TableCell>
    //                         <TableCell style={tableBodyStyle}>{parseFloat(data.timing).toFixed(3)}</TableCell>
    //                         <TableCell style={tableBodyStyle}>{parseFloat(data.variance).toFixed(3)}</TableCell>
    //                         <TableCell style={tableBodyStyle}>{data.kPart > 0.01 ? (data.kPart * 100).toFixed(2) + '%' : null}</TableCell>
    //                         <TableCell style={tableBodyStyle}>{data.atksOnDeath}</TableCell>
    //                         <TableCell style={tableBodyStyle}>{data.atksBeforePS}</TableCell>
    //                         <TableCell style={tableBodyStyle}>{data.atksAfterDeath}</TableCell>
    //                         <TableCell style={tableBodyStyle}>{data.atksIntoPS}</TableCell>
    //                     </TableRow>
    //                     :
    //                     null
    //                 )

    //             })
    //                 :
    //                 null}
    //         </TableBody>
    //     </Table>
    // </TableContainer>

  )
}
