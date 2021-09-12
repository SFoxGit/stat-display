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
    <TableContainer>
      <Table  variant="dark" className="sortable" style={{ boxShadow: "2px 2px 2px black" , background: "linear-gradient(329deg, rgba(57,57,57,1) 37%, rgba(96,96,96,1) 68%, rgba(115,115,115,1) 91%)"}}>
        <TableHead>
          <TableRow >
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
              <TableRow key={data.title} style={{ textAlign: 'center' }}>
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
