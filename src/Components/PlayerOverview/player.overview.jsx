import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function PlayerOverview(props) {
  const summaryStats = props.summaryStats
  const matchIndex = props.matchIndex

  const blueTeam = {
    background: "linear-gradient(0deg, rgba(0,0,84,1) 31%, rgba(0,0,143,1) 60%, rgba(0,0,227,1) 91%)",
    textShadow: "2px 2px black"
    };

  const redTeam = {
    background: "linear-gradient(0deg, rgba(111,0,0,1) 48%, rgba(167,0,0,1) 81%, rgba(250,0,0,1) 100%)",
    textShadow: "2px 2px black"
  };

  return (
    <TableContainer style={{ boxShadow: "7px 7px 7px black" }}>
      <Table key={matchIndex} style={{ boxShadow: "7px 7px 5px black", fontWeight: "bolder", fontSize: "18px", background: "grey" }}>
        <TableHead>
          <TableRow style={{ textAlign: 'center', background: "linear-gradient(0deg, rgba(0,0,0,1) 31%, rgba(31,31,31,1) 60%, rgba(70,70,70,1) 91%)" }}>
            <TableCell width="20%" style={{color: "white", fontSize: "18px", textAlign: "center"}}>player</TableCell>
            <TableCell style={{color: "white", fontSize: "18px", textAlign: "center"}}>team</TableCell>
            <TableCell style={{color: "white", fontSize: "18px", textAlign: "center"}}>powerset</TableCell>
            <TableCell style={{color: "white", fontSize: "18px", textAlign: "center"}}>D</TableCell>
            <TableCell style={{color: "white", fontSize: "18px", textAlign: "center"}}>T</TableCell>
            <TableCell style={{color: "white", fontSize: "18px", textAlign: "center"}}>survival</TableCell>
            <TableCell style={{color: "white", fontSize: "18px", textAlign: "center"}}>otp</TableCell>
            <TableCell style={{color: "white", fontSize: "18px", textAlign: "center"}}>ohp</TableCell>
            <TableCell style={{color: "white", fontSize: "18px", textAlign: "center"}}>atks</TableCell>
            <TableCell style={{color: "white", fontSize: "18px", textAlign: "center"}}>KP</TableCell>
            <TableCell style={{color: "white", fontSize: "18px", textAlign: "center"}}>AoK</TableCell>
            <TableCell style={{color: "white", fontSize: "18px", textAlign: "center"}}>Ab4PS</TableCell>
            <TableCell style={{color: "white", fontSize: "18px", textAlign: "center"}}>AaK</TableCell>
            <TableCell style={{color: "white", fontSize: "18px", textAlign: "center"}}>Ain2PS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {summaryStats.length ? summaryStats.map(data => {
            let teamStyle;
            if (data.team === "BLU") { teamStyle = blueTeam }
            if (data.team === "RED") { teamStyle = redTeam }
            return (
              <TableRow style={teamStyle} key={data.player}>
                <TableCell style={{color: "white", fontWeight: "bold", textAlign: "center", fontSize: "12px"}}>{data.player}</TableCell>
                <TableCell style={{color: "white", fontWeight: "bold", textAlign: "center", fontSize: "12px"}}>{data.team}</TableCell>
                <TableCell style={{color: "white", fontWeight: "bold", textAlign: "center", fontSize: "12px"}}>{data.powersets}</TableCell>
                <TableCell style={{color: "white", fontWeight: "bold", textAlign: "center", fontSize: "12px"}}>{data.deaths}</TableCell>
                <TableCell style={{color: "white", fontWeight: "bold", textAlign: "center", fontSize: "12px"}}>{data.targets}</TableCell>
                <TableCell style={{color: "white", fontWeight: "bold", textAlign: "center", fontSize: "12px"}}>{(data.survival * 100).toFixed(2) + '%'}</TableCell>
                <TableCell style={{color: "white", fontWeight: "bold", textAlign: "center", fontSize: "12px"}}>{data.otp > 0.01 ? (data.otp * 100).toFixed(2) + '%' : null}</TableCell>
                <TableCell style={{color: "white", fontWeight: "bold", textAlign: "center", fontSize: "12px"}}>{data.ohp ? (data.ohp * 100).toFixed(2) + '%' : null}</TableCell>
                <TableCell style={{color: "white", fontWeight: "bold", textAlign: "center", fontSize: "12px"}}>{data.atks}</TableCell>
                <TableCell style={{color: "white", fontWeight: "bold", textAlign: "center", fontSize: "12px"}}>{data.kPart > 0.01 ? (data.kPart * 100).toFixed(2) + '%' : null}</TableCell>
                <TableCell style={{color: "white", fontWeight: "bold", textAlign: "center", fontSize: "12px"}}>{data.atksOnDeath}</TableCell>
                <TableCell style={{color: "white", fontWeight: "bold", textAlign: "center", fontSize: "12px"}}>{data.atksBeforePS}</TableCell>
                <TableCell style={{color: "white", fontWeight: "bold", textAlign: "center", fontSize: "12px"}}>{data.atksAfterDeath}</TableCell>
                <TableCell style={{color: "white", fontWeight: "bold", textAlign: "center", fontSize: "12px"}}>{data.atksIntoPS}</TableCell>
              </TableRow>
            )

          })
            :
            null}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
