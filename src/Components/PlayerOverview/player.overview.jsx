import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function PlayerOverview(props) {
  const summaryStats = props.summaryStats
  // const setSummaryStats = props.setSummaryStats
  const matchIndex = props.matchIndex
  // const matchData = props.matchData

  const blueTeam = {
    color: 'cyan',
    textAlign: 'center'
  };

  const redTeam = {
    color: 'indianred',
    textAlign: 'center'
  };

  return (
    <TableContainer>
      <Table variant="dark" className="rounded" key={matchIndex} style={{ boxShadow: "7px 7px 5px black", fontWeight: "bolder", fontSize: "18px", textShadow: "3px 3px 0 black", }}>
        <TableHead>
          <TableRow style={{ textAlign: 'center' }}>
            <TableCell>player</TableCell>
            <TableCell>team</TableCell>
            <TableCell>powerset</TableCell>
            <TableCell>deaths</TableCell>
            <TableCell>targets</TableCell>
            <TableCell>survival</TableCell>
            <TableCell>otp</TableCell>
            <TableCell>heal</TableCell>
            <TableCell>atks</TableCell>
            <TableCell>KP</TableCell>
            <TableCell>Atks on Kill</TableCell>
            <TableCell>Atks b4 PS</TableCell>
            <TableCell>Atk after Kill</TableCell>
            <TableCell>Atks in2 PS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {summaryStats.length ? summaryStats.map(data => {
            let teamStyle;
            if (data.team === "BLU") { teamStyle = blueTeam }
            if (data.team === "RED") { teamStyle = redTeam }
            return (
              <TableRow style={teamStyle} key={data.player}>
                <TableCell>{data.player}</TableCell>
                <TableCell>{data.team}</TableCell>
                <TableCell>{data.powersets}</TableCell>
                <TableCell>{data.deaths}</TableCell>
                <TableCell>{data.targets}</TableCell>
                <TableCell>{(data.survival * 100).toFixed(2) + '%'}</TableCell>
                <TableCell>{data.otp > 0.01 ? (data.otp * 100).toFixed(2) + '%' : null}</TableCell>
                <TableCell>{data.ohp ? (data.ohp * 100).toFixed(2) + '%' : null}</TableCell>
                <TableCell>{data.atks}</TableCell>
                <TableCell>{data.kPart > 0.01 ? (data.kPart * 100).toFixed(2) + '%' : null}</TableCell>
                <TableCell>{data.atksOnDeath}</TableCell>
                <TableCell>{data.atksBeforePS}</TableCell>
                <TableCell>{data.atksAfterDeath}</TableCell>
                <TableCell>{data.atksIntoPS}</TableCell>
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
