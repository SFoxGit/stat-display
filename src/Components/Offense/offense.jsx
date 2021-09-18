import { Box } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import OffenseBar from '../OffenseBar/offense.bar'
import OffenseTable from '../OffenseTable/offense.table'
import SpikeTeamChart from '../SpikeTeam/spike.team.chart'

export default function Offense(props) {
    const summaryStats = props.summaryStats
    const matchData = props.matchData
    const [spikeData, setSpikeData] = useState([])
    useEffect(() => {
        const newArr = []
        const spikeSum = matchData.data.spike_summary
        for (const spike of spikeSum) {
            console.log(spike)
            if (spike.team === "RED") {
                newArr.push({
                    attackers: parseFloat(spike.attackers),
                    attacks: parseFloat(spike.attacks),
                    death: parseFloat(spike.death),
                    team: "BLU",
                    // duration: parseFloat(spike.duration),
                    // greensAvailable: parseFloat(spike.greensAvailable),
                    // greensUsed: parseFloat(spike.greensUsed),
                    // healsReceived: parseFloat(spike.healsReceived),
                    // hitWindow: parseFloat(spike.hitWindow),
                    // hpLost: parseFloat(spike.hpLost),
                    id: parseFloat(spike.id),
                    player: spike.player,
                    // spikeToSpike: parseFloat(spike.spikeToSpike),
                    start: parseFloat(spike.start)
                })
            }
            if (spike.team === "BLU") {
                newArr.push({
                    attackers: parseFloat(spike.attackers),
                    attacks: parseFloat(spike.attacks),
                    death: parseFloat(spike.death),
                    team: "RED",
                    // duration: parseFloat(spike.duration),
                    // greensAvailable: parseFloat(spike.greensAvailable),
                    // greensUsed: parseFloat(spike.greensUsed),
                    // healsReceived: parseFloat(spike.healsReceived),
                    // hitWindow: parseFloat(spike.hitWindow),
                    // hpLost: parseFloat(spike.hpLost),
                    id: parseFloat(spike.id),
                    player: spike.player,
                    // spikeToSpike: parseFloat(spike.spikeToSpike),
                    start: parseFloat(spike.start)
                })
            }
        }
        setSpikeData([...newArr])

    }, [matchData])
    return (
        <div>
            <OffenseBar summaryStats={summaryStats} />
            <OffenseTable summaryStats={summaryStats} />
            <Box style={{backgroundColor: "white", marginTop: "20px"}}>
                <SpikeTeamChart spikeData={spikeData} />
            </Box>
        </div>
    )
}
