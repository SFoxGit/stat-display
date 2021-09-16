import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function Summary(props) {
  const summary = props.summary

  const title = {
    fontWeight: "bolder",
    fontSize: "24px",
  }

  return (
    <TableContainer style={{ boxShadow: "7px 7px 7px black" }}>
      <Table  variant="dark" className="sortable" >
        <TableHead>
          <TableRow style={{background: "linear-gradient(0deg, rgba(0,0,0,1) 31%, rgba(31,31,31,1) 60%, rgba(70,70,70,1) 91%)" }}>
            <TableCell></TableCell>
            <TableCell style={{ textAlign: 'center', fontWeight: "bolder", fontSize: "24px", textShadow: "3px 3px 0 black", color: "white" }}>Blue</TableCell>
            <TableCell style={{ textAlign: 'center', fontWeight: "bolder", fontSize: "24px", textShadow: "3px 3px 0 black", color: "white" }}>Red</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {summary.length ? summary.map(data => {
            let redStyle;
            let blueStyle;
            if (parseFloat(data.blue) > parseFloat(data.red)) {
              blueStyle = { color: 'cyan', border: '2px dotted gold', fontWeight: "bolder", fontSize: "24px", textShadow: "3px 3px 0 black", textAlign: "center"}
              redStyle = { color: 'indianred', fontWeight: "bolder", fontSize: "24px", textShadow: "3px 3px 0 black", textAlign: "center"}
            } else if (data.blue < data.red) {
              blueStyle = { color: 'cyan', fontWeight: "bolder", fontSize: "24px", textShadow: "3px 3px 0 black", textAlign: "center"}
              redStyle = { color: 'indianred', border: '2px dotted gold', fontWeight: "bolder", fontSize: "24px", textShadow: "3px 3px 0 black", textAlign: "center"}
            } else {
              blueStyle = { color: 'cyan', fontWeight: "bolder", fontSize: "24px", textShadow: "3px 3px 0 black", textAlign: "center"}
              redStyle = { color: 'indianred', fontWeight: "bolder", fontSize: "24px", textShadow: "3px 3px 0 black", textAlign: "center"}
            }
            return (
              <TableRow key={data.title} style={{ textAlign: 'center', background: "linear-gradient(0deg, rgba(6,89,94,1) 34%, rgba(48,154,163,1) 75%, rgba(134,226,226,1) 100%)" }}>
                <TableCell style={{ textAlign: 'center', fontWeight: "bolder", fontSize: "24px", textShadow: "3px 3px 0 black", color: "white" }}>{data.title}</TableCell>
                <TableCell><div style={blueStyle}>{data.blue}</div></TableCell>
                <TableCell><div style={redStyle}>{data.red}</div></TableCell>
              </TableRow>
            )

          }
          )
            :
            null
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}
