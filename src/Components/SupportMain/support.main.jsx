import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    backgroundColor: theme.palette.success.dark,
    color: theme.palette.common.white,

  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function SupportMain(props) {
  const summaryStats = props.summaryStats
  const blueTeam = {
    color: 'cyan',
    textAlign: 'center',
    textShadow: "3px 3px 0 black",
    fontWeight: "bolder",
    fontSize: "18px"
  };

  const redTeam = {
    color: 'indianred',
    textAlign: 'center',
    textShadow: "3px 3px 0 black",
    fontWeight: "bolder",
    fontSize: "18px"
  };
  return (
    <TableContainer>
      <Table  variant="dark" style={{ boxShadow: "7px 7px 5px black" }}>
        <TableHead>
          <StyledTableRow style={{ textAlign: 'center' }}>
            <StyledTableCell>player</StyledTableCell>
            <StyledTableCell>Heal Before Phase</StyledTableCell>
            <StyledTableCell>HO b4 Kill</StyledTableCell>
            <StyledTableCell>AP b4 Kill</StyledTableCell>
            <StyledTableCell>Heal After Death</StyledTableCell>
            <StyledTableCell>Heal After Phase</StyledTableCell>
            <StyledTableCell>CMs</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {summaryStats.length ? summaryStats.map(data => {

            let teamStyle;
            if (data.team === "BLU") { teamStyle = blueTeam }
            if (data.team === "RED") { teamStyle = redTeam }
            if (data.ohp) {
              return (
                <StyledTableRow style={teamStyle} key={data.player}>
                  <StyledTableCell>{data.player}</StyledTableCell>
                  <StyledTableCell>{data.ohp ? data.healsBeforePS : null}</StyledTableCell>
                  <StyledTableCell>{data.ohp ? data.hoBeforeDeath : null}</StyledTableCell>
                  <StyledTableCell>{data.ohp ? data.apBeforeDeath : null}</StyledTableCell>
                  <StyledTableCell>{data.ohp ? data.healsAfterDeath : null}</StyledTableCell>
                  <StyledTableCell>{data.ohp ? data.healsAfterPS : null}</StyledTableCell>
                  <StyledTableCell>{data.ohp ? data.cms : null}</StyledTableCell>
                </StyledTableRow>
              )
            } else return null
          }) : null}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
