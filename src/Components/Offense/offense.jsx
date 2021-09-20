import React, { useEffect, useState } from 'react'
import OffenseBar from '../OffenseBar/offense.bar'
import OffenseTable from '../OffenseTable/offense.table'
import PlayerChart from '../PlayerChart/player.chart'

export default function Offense(props) {
  const summaryStats = props.summaryStats
  const matchData = props.matchData
  const [player, setPlayer] = useState()
  const [redSpikes, setRedSpikes] = useState([])
  const [blueSpikes, setBlueSpikes] = useState([])
  const [playerDeath, setPlayerDeath] = useState([])
  const [playerSurvive, setPlayerSurvive] = useState([])
  const [targetDeath, setTargetDeath] = useState([])
  const [teamSpikes, setTeamSpikes] = useState([])

  const updatePlayer = (playerName, playerTeam) => {
    setPlayer(playerName)
    if (playerTeam === "RED") {
      const targetKill = redSpikes.filter(element => element.death === "1")
      const playerSpikes = blueSpikes.filter(element => element.player === playerName)
      setPlayerDeath(playerSpikes.filter(element => element.death === "1"))
      setPlayerSurvive(playerSpikes.filter(element => element.death === "0"))
      setTargetDeath(targetKill)
      setTeamSpikes([...redSpikes])
    }
    if (playerTeam === "BLU") {
      const targetKill = blueSpikes.filter(element => element.death === "1")
      const playerSpikes = redSpikes.filter(element => element.player === playerName)
      setPlayerDeath(playerSpikes.filter(element => element.death === "1"))
      setPlayerSurvive(playerSpikes.filter(element => element.death === "0"))
      setTargetDeath(targetKill)
      setTeamSpikes([...blueSpikes])
    }
  }

  useEffect(() => {
    const blueArray = matchData.data.spike_summary.filter(element => element.team === "RED")
    const redArray = matchData.data.spike_summary.filter(element => element.team === "BLU")
    const spikeLog = matchData.data.spike_log
    for (let i = spikeLog.length-1; i>=0; i--) {
      spikeLog[i].atkLog.sort((a,b) => {
        return parseFloat(a.hitTime) - parseFloat(b.hitTime)
      })
    }
    for (let i = blueArray.length-1; i >= 0; i--) {
      const index = spikeLog.findIndex(element => element.id === blueArray[i].id)
      console.log(blueArray[i].id)
      blueArray[i].firstHit = spikeLog[index].atkLog[0].hitTime
      if (blueArray[i].death === "1") {
        const deathIndex = spikeLog[index].atkLog.findIndex(element => element.atk === "death")
        blueArray[i].deathTime = spikeLog[index].atkLog[deathIndex].hitTime
      }
    }
    for (let i = redArray.length-1; i >= 0; i--) {
      const index = spikeLog.findIndex(element => element.id === redArray[i].id)
      redArray[i].firstHit = spikeLog[index].atkLog[0].hitTime
      if (redArray[i].death === "1") {
        const deathIndex = spikeLog[index].atkLog.findIndex(element => element.atk === "death")
        redArray[i].deathTime = spikeLog[index].atkLog[deathIndex].hitTime
      }
    }
    setRedSpikes(redArray)
    setBlueSpikes(blueArray)
  }, [matchData])
  return (
    <div>
      <OffenseBar summaryStats={summaryStats} />
      <OffenseTable summaryStats={summaryStats} updatePlayer={updatePlayer} />
      {player ? <PlayerChart teamSpikes={teamSpikes} playerDeath={playerDeath} playerSurvive={playerSurvive} targetDeath={targetDeath}/> : null}
    </div>
  )
}
