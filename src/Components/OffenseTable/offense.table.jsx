import React, { useEffect, useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function OffenseTable(props) {
    const [tableDispaly, setTableDisplay] = useState([])
    const summaryStats = props.summaryStats

    const tableHeadStyle = { color: "white", fontSize: "18px", textAlign: "center" }
    const tableBodyStyle = { color: "white", fontWeight: "bold", textAlign: "center", fontSize: "12px" }

    const blueTeam = {
        // background: "rgb(2,0,36)",
        background: "linear-gradient(0deg, rgba(0,0,84,1) 31%, rgba(0,0,143,1) 60%, rgba(0,0,227,1) 91%)",
        textShadow: "2px 2px black"
    };

    const redTeam = {
        background: "linear-gradient(0deg, rgba(111,0,0,1) 48%, rgba(167,0,0,1) 81%, rgba(250,0,0,1) 100%)",
        textShadow: "2px 2px black"
    };
    useEffect(() => {
        setTableDisplay([...summaryStats])
    }, [summaryStats])
    return (
        <TableContainer style={{ boxShadow: "7px 7px 7px black" }}>
            <Table key="offenseTable" style={{ boxShadow: "7px 7px 5px black", fontWeight: "bolder", fontSize: "18px", background: "grey" }}>
                <TableHead>
                    <TableRow style={{ textAlign: 'center', background: "linear-gradient(0deg, rgba(0,0,0,1) 31%, rgba(31,31,31,1) 60%, rgba(70,70,70,1) 91%)" }}>
                        <TableCell width="20%" style={tableHeadStyle}>player</TableCell>
                        <TableCell style={tableHeadStyle}>team</TableCell>
                        <TableCell style={tableHeadStyle}>powerset</TableCell>
                        <TableCell style={tableHeadStyle}>D</TableCell>
                        <TableCell style={tableHeadStyle}>T</TableCell>
                        <TableCell style={tableHeadStyle}>otp</TableCell>
                        <TableCell style={tableHeadStyle}>atks</TableCell>
                        <TableCell style={tableHeadStyle}>on</TableCell>
                        <TableCell style={tableHeadStyle}>off</TableCell>
                        <TableCell style={tableHeadStyle}>timing</TableCell>
                        <TableCell style={tableHeadStyle}>variance</TableCell>
                        <TableCell style={tableHeadStyle}>KP</TableCell>
                        <TableCell style={tableHeadStyle}>AoK</TableCell>
                        <TableCell style={tableHeadStyle}>Ab4PS</TableCell>
                        <TableCell style={tableHeadStyle}>AaK</TableCell>
                        <TableCell style={tableHeadStyle}>Ain2PS</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableDispaly.length ? tableDispaly.map(data => {
                        let teamStyle;
                        if (data.team === "BLU") { teamStyle = blueTeam }
                        if (data.team === "RED") { teamStyle = redTeam }
                        return (
                            data.otp > 0.01 ?
                            <TableRow style={teamStyle} key={data.player}>
                                <TableCell style={tableBodyStyle}>{data.player}</TableCell>
                                <TableCell style={tableBodyStyle}>{data.team}</TableCell>
                                <TableCell style={tableBodyStyle}>{data.powersets}</TableCell>
                                <TableCell style={tableBodyStyle}>{data.deaths}</TableCell>
                                <TableCell style={tableBodyStyle}>{data.targets}</TableCell>
                                <TableCell style={tableBodyStyle}>{data.otp > 0.01 ? (data.otp * 100).toFixed(2) + '%' : null}</TableCell>
                                <TableCell style={tableBodyStyle}>{data.atks}</TableCell>
                                <TableCell style={tableBodyStyle}>{data.atksOn}</TableCell>
                                <TableCell style={tableBodyStyle}>{data.atksOff}</TableCell>
                                <TableCell style={tableBodyStyle}>{parseFloat(data.timing).toFixed(3)}</TableCell>
                                <TableCell style={tableBodyStyle}>{parseFloat(data.variance).toFixed(3)}</TableCell>
                                <TableCell style={tableBodyStyle}>{data.kPart > 0.01 ? (data.kPart * 100).toFixed(2) + '%' : null}</TableCell>
                                <TableCell style={tableBodyStyle}>{data.atksOnDeath}</TableCell>
                                <TableCell style={tableBodyStyle}>{data.atksBeforePS}</TableCell>
                                <TableCell style={tableBodyStyle}>{data.atksAfterDeath}</TableCell>
                                <TableCell style={tableBodyStyle}>{data.atksIntoPS}</TableCell>
                            </TableRow>
                            :
                            null
                        )

                    })
                        :
                        null}
                </TableBody>
            </Table>
        </TableContainer>

    )
}
