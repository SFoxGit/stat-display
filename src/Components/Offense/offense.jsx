import React, { useEffect, useState } from 'react'
import OffenseBar from '../OffenseBar/offense.bar'
import OffenseTable from '../OffenseTable/offense.table'

export default function Offense(props) {
  const summaryStats = props.summaryStats
  const matchData = props.matchData
  const [spikeData, setSpikeData] = useState([])
  const [firstSpikeData, setFirstSpikeData] = useState([])
  const [redData, setRedData] = useState([])
  const [blueData, setblueData] = useState([])
  const [displayRed, setDisplayRed] = useState(true)
  const [displayBlue, setDisplayBlue] = useState(true)

  useEffect(() => {
    const redArr = []
    const blueArr = []
    const spikeSum = matchData.data.spike_summary
    let redKills = 0
    let blueKills = 0
    for (const spike of spikeSum) {
      if (parseFloat(spike.spikeToSpike) > 3) {
        if (spike.team === "RED") {
          if (spike.death === "1") {redKills++}
          redArr.push({
            attackers: parseFloat(spike.attackers),
            attacks: parseFloat(spike.attacks),
            atkFormat: (parseFloat(spike.attacks) - parseFloat(spike.attackers)),
            death: parseFloat(spike.death) ? redKills : null,
            team: "BLU",
            duration: parseFloat(spike.duration),
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
          if (spike.death === "1") {blueKills++}
          blueArr.push({
            attackers: parseFloat(spike.attackers),
            attacks: parseFloat(spike.attacks),
            atkFormat: (parseFloat(spike.attacks) - parseFloat(spike.attackers)),
            death: parseFloat(spike.death) ? blueKills : null,
            team: "RED",
            duration: parseFloat(spike.duration),
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
    }
    setRedData([...redArr])
    setblueData([...blueArr])

  }, [matchData])
  return (
    <div>
      <OffenseBar summaryStats={summaryStats} />
      <OffenseTable summaryStats={summaryStats} />
    </div>
  )
}
