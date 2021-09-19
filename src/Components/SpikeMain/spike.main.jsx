import React, { useEffect, useState } from 'react'
import SpikeTeamChart from '../SpikeTeam/spike.team.chart'
// import FormLabel from '@material-ui/core/FormLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
import { Box } from '@material-ui/core'
import SpikeTable from '../SpikeTable/spike.table'

export default function SpikeMain(props) {
  const [redData, setRedData] = useState([])
  const [blueData, setblueData] = useState([])
  const matchData = props.matchData
  // const redChange = (event) => {
  //   setDisplayRed(event.target.checked)
  //   if (event.target.checked && displayBlue) { setSpikeData(firstSpikeData) }
  //   if (event.target.checked && !displayBlue) {
  //     const filterArr = firstSpikeData.filter(element => element.team === "RED")
  //     setSpikeData(filterArr)
  //   }
  //   if (!event.target.checked && displayBlue) {
  //     const filterArr = firstSpikeData.filter(element => element.team === "BLU")
  //     setSpikeData(filterArr)
  //   }
  // }
  // const blueChange = (event) => {
  //   setDisplayBlue(event.target.checked)
  //   if (event.target.checked && displayRed) { setSpikeData(firstSpikeData) }
  //   if (event.target.checked && !displayRed) {
  //     const filterArr = firstSpikeData.filter(element => element.team === "BLU")
  //     setSpikeData(filterArr)
  //   }
  //   if (!event.target.checked && displayRed) {
  //     const filterArr = firstSpikeData.filter(element => element.team === "RED")
  //     setSpikeData(filterArr)
  //   }
  // }

  useEffect(() => {
    const redArr = []
    const blueArr = []
    const spikeSum = matchData.data.spike_summary
    let redKills = 0
    let blueKills = 0
    for (const spike of spikeSum) {
      if (parseFloat(spike.spikeToSpike) > 3) {
        if (spike.team === "RED") {
          if (spike.death === "1") { redKills++ }
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
          if (spike.death === "1") { blueKills++ }
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
      <Box style={{ backgroundColor: "white", marginTop: "20px" }}>
        {/* <FormControl component="fieldset" variant="standard" style={{width: "100%"}}>
          <Box sx={{ display: 'flex', flexDirection: "column", alignItems: 'center', width: "100%"}}>
            <FormLabel component="legend">Teams to view</FormLabel>
            <FormGroup style={{ flexDirection: "row" }}>
              <FormControlLabel
                control={
                  <Switch checked={displayRed} onChange={redChange} name="red" />
                }
                label="Red"
              />
              <FormControlLabel
                control={
                  <Switch checked={displayBlue} onChange={blueChange} name="blue" color="primary" />
                }
                label="Blue"
              />
            </FormGroup>
          </Box>
        </FormControl> */}
        <SpikeTeamChart redData={redData} blueData={blueData} />
      </Box>
      <SpikeTable matchData={matchData}/>

    </div>
  )
}
