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
  // const [playerDeath, setPlayerDeath] = useState([])
  // const [playerSurvive, setPlayerSurvive] = useState([])
  // const [targetDeath, setTargetDeath] = useState([])
  const [teamSpikes, setTeamSpikes] = useState([])

  const updatePlayer = (playerName, playerTeam) => {
    setTeamSpikes([])
    setPlayer(playerName)
    if (playerTeam === "RED") {
      let newArr = []
      newArr = [...redSpikes]
      const targetKill = redSpikes.filter(element => element.death === "1")
      const redSpikeLog = matchData.data.spike_log.filter(element => element.team === "BLU")
      for (let i = redSpikeLog.length-1; i>=0; i--) {
        const summaryRelated = newArr.find(element => element.id === redSpikeLog[i].id)
        summaryRelated.playerFirst = null
        summaryRelated.playerSecond = null
        const teamAtks = redSpikeLog[i].atkLog.filter(element => element.team === "RED")
        teamAtks.sort((a, b) => parseFloat(a.hitTime) - parseFloat(b.hitTime))
        summaryRelated.spikeEnd = teamAtks[teamAtks.length-1].hitTime
        const playerAttacks = redSpikeLog[i].atkLog.filter(element => element.caster === playerName)
        if (playerAttacks.length) {
          summaryRelated.playerFirst = parseFloat(playerAttacks[0].hitTime)
        }
        if (playerAttacks[1]) {
          summaryRelated.playerSecond = parseFloat(playerAttacks[1].hitTime)
        }
      }
      const playerSpikes = blueSpikes.filter(element => element.player === playerName)
      const playerDeaths = playerSpikes.filter(element => element.death === "1")
      const playerSurvive = playerSpikes.filter(element => element.death === "0")
      targetKill.forEach(element => newArr.push({ start: element.start, targetDeath: element.deathTime }))
      playerDeaths.forEach(element => newArr.push({ start: element.start, playerDeath: element.duration }))
      playerSurvive.forEach(element => newArr.push({ start: element.start, playerSurvive: element.duration }))
      newArr.forEach(element => element.start = parseFloat(element.start))
      newArr.sort((a, b) => a.start - b.start)
      setTeamSpikes(newArr)
    }
    if (playerTeam === "BLU") {
      const newArr = [...blueSpikes]
      const targetKill = blueSpikes.filter(element => element.death === "1")
      const blueSpikeLog = matchData.data.spike_log.filter(element => element.team === "RED")
      for (let i = blueSpikeLog.length-1; i>=0; i--) {
        const summaryRelated = newArr.find(element => element.id === blueSpikeLog[i].id)
        const playerAttacks = blueSpikeLog[i].atkLog.filter(element => element.caster === playerName)
        if (playerAttacks.length) {
          summaryRelated.playerFirst = playerAttacks[0].hitTime
        }
        if (playerAttacks[1]) {
          summaryRelated.playerSecond = playerAttacks[1].hitTime
        }
      }
      const playerSpikes = redSpikes.filter(element => element.player === playerName)
      const playerDeaths = playerSpikes.filter(element => element.death === "1")
      const playerSurvive = playerSpikes.filter(element => element.death === "0")
      targetKill.forEach(element => newArr.push({ start: element.start, targetDeath: element.deathTime }))
      playerDeaths.forEach(element => newArr.push({ start: element.start, playerDeath: element.duration }))
      playerSurvive.forEach(element => newArr.push({ start: element.start, playerSurvive: element.duration }))
      newArr.forEach(element => element.start = parseFloat(element.start))
      newArr.sort((a, b) => a.start - b.start)
      setTeamSpikes([...newArr])
    }
  }

  useEffect(() => {
    const blueArray = matchData.data.spike_summary.filter(element => element.team === "RED")
    const redArray = matchData.data.spike_summary.filter(element => element.team === "BLU")
    const spikeLog = matchData.data.spike_log
    for (let i = spikeLog.length - 1; i >= 0; i--) {
      spikeLog[i].atkLog.sort((a, b) => {
        return parseFloat(a.hitTime) - parseFloat(b.hitTime)
      })
    }
    for (let i = blueArray.length - 1; i >= 0; i--) {
      const index = spikeLog.findIndex(element => element.id === blueArray[i].id)
      const first = spikeLog[index].atkLog.find(element => element.team === "BLU" && element.atk !== "enervating field" && element.atk !== "corrosive enzyme" && element.hitTime !== "")
      blueArray[i].firstHit = first.hitTime
      if (blueArray[i].death === "1") {
        const deathIndex = spikeLog[index].atkLog.findIndex(element => element.atk === "death")
        blueArray[i].deathTime = spikeLog[index].atkLog[deathIndex].hitTime
      }
    }
    for (let i = redArray.length - 1; i >= 0; i--) {
      const index = spikeLog.findIndex(element => element.id === redArray[i].id)
      const first = spikeLog[index].atkLog.find(element => element.team === "RED" && element.atk !== "enervating field" && element.atk !== "corrosive enzyme" && element.hitTime !== "")
      redArray[i].firstHit = first.hitTime
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
      {player ? <PlayerChart teamSpikes={teamSpikes} /> : null}
    </div>
  )
}
