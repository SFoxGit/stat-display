import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    backgroundColor: 'mustard',
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

  return (
    <TableContainer style={{ boxShadow: "7px 7px 7px black", marginTop: "20px", marginBottom: "20px"  }}>
      <Table>
        <TableHead>
          <StyledTableRow style={{ textAlign: 'center', background: "linear-gradient(0deg, rgba(0,0,0,1) 31%, rgba(31,31,31,1) 60%, rgba(70,70,70,1) 91%)"  }}>
            <StyledTableCell style={{fontWeight: "bold"}} align="center">player</StyledTableCell>
            <StyledTableCell style={{fontWeight: "bold"}} align="center">Heal Before Phase</StyledTableCell>
            <StyledTableCell style={{fontWeight: "bold"}} align="center">HO b4 Kill</StyledTableCell>
            <StyledTableCell style={{fontWeight: "bold"}} align="center">AP b4 Kill</StyledTableCell>
            <StyledTableCell style={{fontWeight: "bold"}} align="center">Heal After Death</StyledTableCell>
            <StyledTableCell style={{fontWeight: "bold"}} align="center">Heal After Phase</StyledTableCell>
            <StyledTableCell style={{fontWeight: "bold"}} align="center">CMs</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {summaryStats.length ? summaryStats.map(data => {

            
            if (data.ohp) {
              return (
                data.team === "RED" ? 
                <StyledTableRow key={data.player}>
                  <StyledTableCell style={{color: "white",  fontSize: "12px", fontWeight: "bold", background: "linear-gradient(0deg, rgba(111,0,0,1) 48%, rgba(167,0,0,1) 81%, rgba(250,0,0,1) 100%)", textShadow: "2px 2px black"}} align="center">{data.player}</StyledTableCell> 
                  <StyledTableCell style={{color: "white",  fontSize: "12px", fontWeight: "bold", background: "linear-gradient(0deg, rgba(111,0,0,1) 48%, rgba(167,0,0,1) 81%, rgba(250,0,0,1) 100%)", textShadow: "2px 2px black"}} align="center">{data.ohp ? data.healsBeforePS : null}</StyledTableCell>
                  <StyledTableCell style={{color: "white",  fontSize: "12px", fontWeight: "bold", background: "linear-gradient(0deg, rgba(111,0,0,1) 48%, rgba(167,0,0,1) 81%, rgba(250,0,0,1) 100%)", textShadow: "2px 2px black"}} align="center">{data.ohp ? data.hoBeforeDeath : null}</StyledTableCell>
                  <StyledTableCell style={{color: "white",  fontSize: "12px", fontWeight: "bold", background: "linear-gradient(0deg, rgba(111,0,0,1) 48%, rgba(167,0,0,1) 81%, rgba(250,0,0,1) 100%)", textShadow: "2px 2px black"}} align="center">{data.ohp ? data.apBeforeDeath : null}</StyledTableCell>
                  <StyledTableCell style={{color: "white",  fontSize: "12px", fontWeight: "bold", background: "linear-gradient(0deg, rgba(111,0,0,1) 48%, rgba(167,0,0,1) 81%, rgba(250,0,0,1) 100%)", textShadow: "2px 2px black"}} align="center">{data.ohp ? data.healsAfterDeath : null}</StyledTableCell>
                  <StyledTableCell style={{color: "white",  fontSize: "12px", fontWeight: "bold", background: "linear-gradient(0deg, rgba(111,0,0,1) 48%, rgba(167,0,0,1) 81%, rgba(250,0,0,1) 100%)", textShadow: "2px 2px black"}} align="center">{data.ohp ? data.healsAfterPS : null}</StyledTableCell>
                  <StyledTableCell style={{color: "white",  fontSize: "12px", fontWeight: "bold", background: "linear-gradient(0deg, rgba(111,0,0,1) 48%, rgba(167,0,0,1) 81%, rgba(250,0,0,1) 100%)", textShadow: "2px 2px black"}} align="center">{data.ohp ? data.cms : null}</StyledTableCell>
                </StyledTableRow>
                :
                <StyledTableRow key={data.player}>
                  <StyledTableCell style={{color: "white",  fontSize: "12px", fontWeight: "bold", background: "linear-gradient(0deg, rgba(0,0,84,1) 31%, rgba(0,0,143,1) 60%, rgba(0,0,227,1) 91%)", textShadow: "2px 2px black"}} align="center">{data.player}</StyledTableCell> 
                  <StyledTableCell style={{color: "white",  fontSize: "12px", fontWeight: "bold", background: "linear-gradient(0deg, rgba(0,0,84,1) 31%, rgba(0,0,143,1) 60%, rgba(0,0,227,1) 91%)", textShadow: "2px 2px black"}} align="center">{data.ohp ? data.healsBeforePS : null}</StyledTableCell>
                  <StyledTableCell style={{color: "white",  fontSize: "12px", fontWeight: "bold", background: "linear-gradient(0deg, rgba(0,0,84,1) 31%, rgba(0,0,143,1) 60%, rgba(0,0,227,1) 91%)", textShadow: "2px 2px black"}} align="center">{data.ohp ? data.hoBeforeDeath : null}</StyledTableCell>
                  <StyledTableCell style={{color: "white",  fontSize: "12px", fontWeight: "bold", background: "linear-gradient(0deg, rgba(0,0,84,1) 31%, rgba(0,0,143,1) 60%, rgba(0,0,227,1) 91%)", textShadow: "2px 2px black"}} align="center">{data.ohp ? data.apBeforeDeath : null}</StyledTableCell>
                  <StyledTableCell style={{color: "white",  fontSize: "12px", fontWeight: "bold", background: "linear-gradient(0deg, rgba(0,0,84,1) 31%, rgba(0,0,143,1) 60%, rgba(0,0,227,1) 91%)", textShadow: "2px 2px black"}} align="center">{data.ohp ? data.healsAfterDeath : null}</StyledTableCell>
                  <StyledTableCell style={{color: "white",  fontSize: "12px", fontWeight: "bold", background: "linear-gradient(0deg, rgba(0,0,84,1) 31%, rgba(0,0,143,1) 60%, rgba(0,0,227,1) 91%)", textShadow: "2px 2px black"}} align="center">{data.ohp ? data.healsAfterPS : null}</StyledTableCell>
                  <StyledTableCell style={{color: "white",  fontSize: "12px", fontWeight: "bold", background: "linear-gradient(0deg, rgba(0,0,84,1) 31%, rgba(0,0,143,1) 60%, rgba(0,0,227,1) 91%)", textShadow: "2px 2px black"}} align="center">{data.ohp ? data.cms : null}</StyledTableCell>
                </StyledTableRow> 

              )
            } else return null
          }) : null}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
