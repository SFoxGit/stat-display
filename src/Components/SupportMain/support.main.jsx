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
    backgroundColor: theme.palette.common.black,
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
    <TableContainer>
      <Table  variant="dark" style={{ boxShadow: "7px 7px 5px black" }}>
        <TableHead>
          <StyledTableRow style={{ textAlign: 'center' }}>
            <StyledTableCell align="center">player</StyledTableCell>
            <StyledTableCell align="center">Heal Before Phase</StyledTableCell>
            <StyledTableCell align="center">HO b4 Kill</StyledTableCell>
            <StyledTableCell align="center">AP b4 Kill</StyledTableCell>
            <StyledTableCell align="center">Heal After Death</StyledTableCell>
            <StyledTableCell align="center">Heal After Phase</StyledTableCell>
            <StyledTableCell align="center">CMs</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {summaryStats.length ? summaryStats.map(data => {

            
            if (data.ohp) {
              return (
                data.team === "RED" ? 
                <StyledTableRow key={data.player}>
                  <StyledTableCell style={{color: "white",  fontSize: "18px", background: "linear-gradient(0deg, rgba(84,8,16,1) 31%, rgba(143,1,12,1) 71%, rgba(227,15,37,1) 85%)"}} align="center">{data.player}</StyledTableCell> 
                  <StyledTableCell style={{color: "white",  fontSize: "18px", background: "linear-gradient(0deg, rgba(84,8,16,1) 31%, rgba(143,1,12,1) 71%, rgba(227,15,37,1) 85%)"}} align="center">{data.ohp ? data.healsBeforePS : null}</StyledTableCell>
                  <StyledTableCell style={{color: "white",  fontSize: "18px", background: "linear-gradient(0deg, rgba(84,8,16,1) 31%, rgba(143,1,12,1) 71%, rgba(227,15,37,1) 85%)"}} align="center">{data.ohp ? data.hoBeforeDeath : null}</StyledTableCell>
                  <StyledTableCell style={{color: "white",  fontSize: "18px", background: "linear-gradient(0deg, rgba(84,8,16,1) 31%, rgba(143,1,12,1) 71%, rgba(227,15,37,1) 85%)"}} align="center">{data.ohp ? data.apBeforeDeath : null}</StyledTableCell>
                  <StyledTableCell style={{color: "white",  fontSize: "18px", background: "linear-gradient(0deg, rgba(84,8,16,1) 31%, rgba(143,1,12,1) 71%, rgba(227,15,37,1) 85%)"}} align="center">{data.ohp ? data.healsAfterDeath : null}</StyledTableCell>
                  <StyledTableCell style={{color: "white",  fontSize: "18px", background: "linear-gradient(0deg, rgba(84,8,16,1) 31%, rgba(143,1,12,1) 71%, rgba(227,15,37,1) 85%)"}} align="center">{data.ohp ? data.healsAfterPS : null}</StyledTableCell>
                  <StyledTableCell style={{color: "white",  fontSize: "18px", background: "linear-gradient(0deg, rgba(84,8,16,1) 31%, rgba(143,1,12,1) 71%, rgba(227,15,37,1) 85%)"}} align="center">{data.ohp ? data.cms : null}</StyledTableCell>
                </StyledTableRow> 
                :
                <StyledTableRow key={data.player}>
                  <StyledTableCell style={{color: "white",  fontSize: "18px", background: "linear-gradient(0deg, rgba(0,0,84,1) 31%, rgba(0,0,143,1) 60%, rgba(0,0,227,1) 91%)"}} align="center">{data.player}</StyledTableCell> 
                  <StyledTableCell style={{color: "white",  fontSize: "18px", background: "linear-gradient(0deg, rgba(0,0,84,1) 31%, rgba(0,0,143,1) 60%, rgba(0,0,227,1) 91%)"}} align="center">{data.ohp ? data.healsBeforePS : null}</StyledTableCell>
                  <StyledTableCell style={{color: "white",  fontSize: "18px", background: "linear-gradient(0deg, rgba(0,0,84,1) 31%, rgba(0,0,143,1) 60%, rgba(0,0,227,1) 91%)"}} align="center">{data.ohp ? data.hoBeforeDeath : null}</StyledTableCell>
                  <StyledTableCell style={{color: "white",  fontSize: "18px", background: "linear-gradient(0deg, rgba(0,0,84,1) 31%, rgba(0,0,143,1) 60%, rgba(0,0,227,1) 91%)"}} align="center">{data.ohp ? data.apBeforeDeath : null}</StyledTableCell>
                  <StyledTableCell style={{color: "white",  fontSize: "18px", background: "linear-gradient(0deg, rgba(0,0,84,1) 31%, rgba(0,0,143,1) 60%, rgba(0,0,227,1) 91%)"}} align="center">{data.ohp ? data.healsAfterDeath : null}</StyledTableCell>
                  <StyledTableCell style={{color: "white",  fontSize: "18px", background: "linear-gradient(0deg, rgba(0,0,84,1) 31%, rgba(0,0,143,1) 60%, rgba(0,0,227,1) 91%)"}} align="center">{data.ohp ? data.healsAfterPS : null}</StyledTableCell>
                  <StyledTableCell style={{color: "white",  fontSize: "18px", background: "linear-gradient(0deg, rgba(0,0,84,1) 31%, rgba(0,0,143,1) 60%, rgba(0,0,227,1) 91%)"}} align="center">{data.ohp ? data.cms : null}</StyledTableCell>
                </StyledTableRow> 

              )
            } else return null
          }) : null}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
