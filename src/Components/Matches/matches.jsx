import React, { useEffect, useState } from 'react'
import { parse } from 'papaparse';
import MatchSelector from '../MatchSelector/match.selector';
import PlayerOverview from '../PlayerOverview/player.overview';
import Summary from '../Summary/summary';
import SupportMain from '../SupportMain/support.main';
import ScoreChart from '../ScoreChart/score.chart';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const registry = [
  { "file": "/Data/1.cohdemo.csv" },
  { "file": "/Data/2.cohdemo.csv" },
  { "file": "/Data/3.cohdemo.csv" },
  { "file": "/Data/4.cohdemo.csv" },
  { "file": "/Data/5.cohdemo.csv" },
  { "file": "/Data/6.cohdemo.csv" },
  { "file": "/Data/7.cohdemo.csv" },
]
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}));


export default function Matches() {
  const [matches, setMatches] = useState([])
  const [matchIndex, setMatchIndex] = useState(0)
  const [matchData, setMatchData] = useState([]);
  const [summaryStats, setSummaryStats] = useState([]);
  const [summary, setSummary] = useState([]);
  const [scoreLog, setScoreLog] = useState([])
  const classes = useStyles();

  const selectMatch = (index) => {
    // const matchIndex = matches.findIndex((obj => obj.match === index))
    const sortScoreLog = matches[index].data.score_log
    for (const score of sortScoreLog) {
      score.time = parseInt(score.time)
      score.blue = parseInt(score.blue)
      score.red = parseInt(score.red)
    }
    sortScoreLog.sort((a, b) => {
      if (parseInt(a.time) < parseInt(b.time)) {
        return -1
      }
      if (parseInt(a.time) > parseInt(b.time)) {
        return 1
      }
      return null
    })
    setMatchData(matches[index])
    setSummaryStats(matches[index].data.summary_stats)
    setSummary(matches[index].data.summary)
    setScoreLog(sortScoreLog)
    console.log(sortScoreLog)
  }
  useEffect(() => {
    if (!matches.length) {

      registry.forEach(async obj => {
        const response = await fetch(obj.file)
        const reader = response.body.getReader()
        const result = await reader.read() // raw array
        const decoder = new TextDecoder('utf-8')
        const csv = decoder.decode(result.value) // the csv text
        const results = parse(csv) // object with { data, errors, meta }
        const rows = results.data // array of objects
        const gathers = []
        const greens_log = []
        const hp_log = []
        const log = []
        const rogue_log = []
        const score_log = []
        const spike_hp = []
        const spike_log = []
        const spike_stats = []
        const spike_summary = []
        const summary = []
        const summary_stats = []
        const support_breakdown = []
        const support_extras = []
        const support_powers = []
        const support_stats = [];
        let map = rows[1][1]
        console.log(rows.length)

        const asyncIterable = {
          [Symbol.asyncIterator]() {
            return {
              i: 0,
              next() {
                if (this.i <= rows.length) {
                  return Promise.resolve({ value: this.i++, done: false });
                }

                return Promise.resolve({ done: true });
              }
            };
          }
        };
        (async function () {
          for await (let num of asyncIterable) {
            if (num === rows.length) { console.log("Finished Row: " + num) } else {
              const row = rows[num]
              switch (row[2]) {
                case "atk_chains":
                  if (summary_stats.some(e => e.player === row[3])) {
                    const objIndex = summary_stats.findIndex((obj => obj.player === row[3]))
                    summary_stats[objIndex].chains.push({ atks: row[8], count: row[12] })
                  } else {
                    summary_stats.push({ player: row[3], team: row[4], chains: [{ atks: row[8], count: row[12] }], atksOnDeath: 0, atksBeforePS: 0, atksAfterDeath: 0, atksIntoPS: 0, hoBeforeDeath: 0, apBeforeDeath: 0, healsAfterDeath: 0, healsBeforePS: 0, healsAfterPS: 0, cms: 0 })
                  }
                  break;
                case "defence_stats":
                  if (summary_stats.some(e => e.player === row[3])) {
                    const objIndex = summary_stats.findIndex((obj => obj.player === row[3]))
                    summary_stats[objIndex].spikeDam = row[16]
                    summary_stats[objIndex].healsOnSpike = row[17]
                    summary_stats[objIndex].healsTaken = row[18]
                    summary_stats[objIndex].avgJaunt = row[24]
                    summary_stats[objIndex].avgPhase = row[25]
                    summary_stats[objIndex].avgDeath = row[26]
                  } else {
                    summary_stats.push({ player: row[3], team: row[4], deaths: row[14], targets: row[15], spikeDam: row[16], healsOnSpike: row[17], healsTaken: row[18], avgJaunt: row[24], avgPhase: row[25], avgDeath: row[26] })

                  }
                  break;
                case "gathers":
                  gathers.push({ team: row[4], time: row[5] })
                  break;
                case "greens_log":
                  if (greens_log.some(e => e.player === row[3])) {
                    const objIndex = greens_log.findIndex((obj => obj.player === row[3]))
                    greens_log[objIndex].greens.push({ time: row[5], count: row[14] })
                  } else {
                    greens_log.push({ player: row[3], greens: [{ time: row[5], count: row[14] }] })
                  }
                  break;
                case "hp_log":
                  if (hp_log.some(e => e.player === row[3])) {
                    const objIndex = hp_log.findIndex((obj => obj.player === row[3]))
                    hp_log[objIndex].damage.push({ time: row[5], count: row[14] })
                  } else {
                    hp_log.push({ player: row[3], damage: [{ time: row[5], count: row[14] }] })
                  }
                  break;
                case "log":
                  log.push(row)
                  break;
                case "offence_stats":
                  if (summary_stats.some(e => e.player === row[3])) {
                    const objIndex = summary_stats.findIndex((obj => obj.player === row[3]));
                    summary_stats[objIndex].targetsOn = row[16]
                    summary_stats[objIndex].otp = row[17]
                    summary_stats[objIndex].timing = row[18]
                    summary_stats[objIndex].variance = row[27]
                    summary_stats[objIndex].kPart = row[26]
                    summary_stats[objIndex].atksOn = row[23]
                    summary_stats[objIndex].atksOff = row[24]
                  } else {
                    summary_stats.push({ player: row[3], team: row[4], deaths: row[14], targeted: row[15], targetsOn: row[16], otp: row[17], timing: row[18], variance: row[27], kPart: row[26], atksOn: row[23], atksOff: row[24] })
                  }
                  break;
                case "offence_timing":
                  if (summary_stats.some(e => e.player === row[3])) {
                    const objIndex = summary_stats.findIndex((obj => obj.player === row[3]));
                    summary_stats[objIndex].offTiming = { early: row[14], one: row[15], two: row[16], three: row[17], four: row[18], five: row[19], six: row[20] }
                  } else {
                    summary_stats.push({ player: row[3], team: row[4], offTiming: { blast: row[8], early: row[14], one: row[15], two: row[16], three: row[17], four: row[18], five: row[19], six: row[20] } })
                  }
                  break;
                case "rogue_log":
                  rogue_log.push({ player: row[3], team: row[4], time: row[5], action: row[8], target: row[9], targetTeam: row[10] })
                  break;
                case "score_log":
                  if (score_log.some(e => e.time === row[5])) {
                    const objIndex = score_log.findIndex((obj => obj.time === row[5]))
                    if (row[4] === 'RED') {
                      score_log[objIndex].red = row[7]
                    } else {
                      score_log[objIndex].blue = row[7]
                    }
                  } else {
                    if (row[4] === 'RED') {
                      score_log.push({ time: row[5], blue: 0, red: row[7] })
                    } else {
                      score_log.push({ time: row[5], blue: row[7], red: 0 })
                    }
                  }
                  break;
                case "spike_hp":
                  if (spike_hp.some(e => e.id === row[13])) {
                    const objIndex = spike_hp.findIndex((obj => obj.id === row[13]))
                    spike_hp[objIndex].hpLog.push({ time: row[5], hp: row[6] })
                  } else {
                    spike_hp.push({ player: row[3], id: row[13], team: row[4], death: row[7], hpLog: [{ time: row[5], hp: row[6] }] })
                  }
                  break;
                case "spike_log":
                  if (spike_log.some(e => e.id === row[13])) {
                    const objIndex = spike_log.findIndex((obj => obj.id === row[13]))
                    spike_log[objIndex].atkLog.push({ time: row[5], atk: row[8], caster: row[9], team: row[10], distance: row[14], hitTime: row[15] })
                  } else {
                    spike_log.push({ player: row[3], id: row[13], team: row[4], death: row[7], atkLog: [{ time: row[5], atk: row[8], caster: row[9], team: row[10], distance: row[14], hitTime: row[15] }] })
                  }
                  break;
                case "spike_stats":
                  if (spike_stats.some(e => e.id === row[13])) {
                    const objIndex = spike_stats.findIndex((obj => obj.id === row[13]))
                    if (row[8] === "attacks") { spike_stats[objIndex].attacks = row[12] }
                    if (row[8] === "heals received") { spike_stats[objIndex].heals = row[12] }
                    if (row[8] === "greens available") { spike_stats[objIndex].greensAvailable = row[12] }
                    if (row[8] === "greens used") { spike_stats[objIndex].greensUsed = row[12] }
                    if (row[8] === "spike duration") { spike_stats[objIndex].duration = row[12] }
                    if (row[8] === "total hp lost") { spike_stats[objIndex].hpLost = row[12] }
                    if (row[8] === "hp after spike") { spike_stats[objIndex].hpAfter = row[12] }
                  } else {
                    spike_stats.push({ player: row[3], id: row[13], team: row[4], death: row[7], attackers: row[12], attacks: '', heals: '', greensAvailable: '', greensUsed: '', duration: '', hpLost: '', hpAfter: '' })
                  }
                  break;
                case "spike_summary":
                  spike_summary.push({ player: row[3], team: row[4], start: row[5], duration: row[6], death: row[7], attacks: row[11], attackers: row[12], id: row[13], hpLost: row[14], greensAvailable: row[15], greensUsed: row[16], hitWindow: row[17], spikeToSpike: row[18], healsReceived: row[19] })
                  break;
                case "summary":
                  map = row[1]
                  summary.push({ title: row[8], blue: row[14], red: row[15] })
                  break;
                case "summary_stats":
                  if (summary_stats.some(e => e.player === row[3])) {
                    const objIndex = summary_stats.findIndex((obj => obj.player === row[3]));
                    summary_stats[objIndex].powersets = row[8]
                    summary_stats[objIndex].deaths = row[14]
                    summary_stats[objIndex].targets = row[15]
                    summary_stats[objIndex].survival = row[16]
                    summary_stats[objIndex].otp = row[17]
                    summary_stats[objIndex].ohp = row[18]
                    summary_stats[objIndex].atks = row[19]
                  } else {
                    summary_stats.push({ player: row[3], team: row[4], powersets: row[8], deaths: row[14], targets: row[15], survival: row[16], otp: row[17], ohp: row[18], atks: row[19], atksOnDeath: 0, atksBeforePS: 0, atksAfterDeath: 0, atksIntoPS: 0, hoBeforeDeath: 0, apBeforeDeath: 0, healsAfterDeath: 0, healsBeforePS: 0, healsAfterPS: 0, cms: 0 })
                  }
                  break;
                case "support_breakdown":
                  support_breakdown.push({ player: row[3], team: row[4], type: row[8], zero: row[14], oneHundred: row[15], belowSeventeen: row[16], fourHundred: row[17], eightHundred: row[18], twelveHundred: row[19], fifteenHundred: row[20], twoHundred: row[21], aboveSeventeen: row[22], late: row[23], lateFast: row[24] })
                  break;
                case "support_extras":
                  if (support_extras.some(e => e.player === row[3])) {
                    const objIndex = support_extras.findIndex((obj => obj.player === row[3]))
                    support_extras[objIndex].actions.push({ name: row[9], count: row[14] })
                  } else {
                    support_extras.push({ player: row[3], team: row[4], actions: [{ name: row[9], count: row[14] }] })
                  }
                  break;
                case "support_powers":
                  support_powers.push({ player: row[3], team: row[4], ap: row[14], ho: row[15] })
                  break;
                case "support_stats":
                  support_stats.push({ player: row[3], team: row[4], heals: row[6], deaths: row[7], targeted: row[11], onTarget: row[14], quick: row[15], slow: row[17], late: row[18], early: row[19], ff: row[22], avgSpeed: row[24], timing: row[25], median: row[30] })
                  break;
                default:
                  runSpikeLog()
                  cmCount()
                  break;
              }
            }
          }
        })();
        const runSpikeLog = () => {
          spike_log.forEach((x, index) => {
            if (index === 0) { console.log("started spike log") }
            if (x.death !== "0") {
              const deathIndex = x.atkLog.findIndex((obj => obj.atk === "death"))
              x.atkLog.forEach(e => {
                if (x.team === e.team && e.distance > 0) {
                  if (e.hitTime < (x.atkLog[deathIndex].hitTime - 0.05)) {
                    if (e.atk === "heal other" || e.atk === "soothe" || e.atk === "rejuvenating circuit") {
                      const playerIndex = summary_stats.findIndex((obj => obj.player === e.caster));
                      summary_stats[playerIndex].hoBeforeDeath = summary_stats[playerIndex].hoBeforeDeath + 1;
                      summary_stats[playerIndex].healsBeforePS = summary_stats[playerIndex].healsBeforePS + 1;
                    }
                    if (e.atk === "absorb pain" || e.atk === "share pain" || e.atk === "insulating circuit") {
                      const playerIndex = summary_stats.findIndex((obj => obj.player === e.caster));
                      summary_stats[playerIndex].apBeforeDeath = summary_stats[playerIndex].apBeforeDeath + 1;
                      summary_stats[playerIndex].healsBeforePS = summary_stats[playerIndex].healsBeforePS + 1;
                    }
                  } else {
                    if (e.atk === "heal other" || e.atk === "soothe" || e.atk === "rejuvenating circuit" || e.atk === "absorb pain" || e.atk === "share pain" || e.atk === "insulating circuit") {
                      const playerIndex = summary_stats.findIndex((obj => obj.player === e.caster));
                      summary_stats[playerIndex].healsAfterDeath = summary_stats[playerIndex].healsAfterDeath + 1;
                    }
                  }
                } else if (e.hitTime < (x.atkLog[deathIndex].hitTime + 0.12) && e.distance > 0) {
                  const playerIndex = summary_stats.findIndex((obj => obj.player === e.caster));
                  summary_stats[playerIndex].atksOnDeath = (summary_stats[playerIndex].atksOnDeath + 1);
                  summary_stats[playerIndex].atksBeforePS = (summary_stats[playerIndex].atksBeforePS + 1);
                } else if (e.distance > 0) {
                  const playerIndex = summary_stats.findIndex((obj => obj.player === e.caster));
                  summary_stats[playerIndex].atksAfterDeath = (summary_stats[playerIndex].atksAfterDeath + 1);
                }
              })
            } else if (x.atkLog.some(e => e.atk === "phase shift" || e.atk === "hibernate")) {
              const phaseIndex = x.atkLog.findIndex((obj => obj.atk === "phase shift" || obj.atk === "hibernate"))
              x.atkLog.forEach(e => {
                if (x.team === e.team && e.distance > 0) {
                  if (e.time < (x.atkLog[phaseIndex].hitTime)) {
                    if (e.atk === "heal other" || e.atk === "soothe" || e.atk === "rejuvenating circuit") {
                      const playerIndex = summary_stats.findIndex((obj => obj.player === e.caster));
                      summary_stats[playerIndex].healsBeforePS = summary_stats[playerIndex].healsBeforePS + 1;
                    }
                    if (e.atk === "absorb pain" || e.atk === "share pain" || e.atk === "insulating circuit") {
                      const playerIndex = summary_stats.findIndex((obj => obj.player === e.caster));
                      summary_stats[playerIndex].healsBeforePS = summary_stats[playerIndex].healsBeforePS + 1;
                    }
                  } else {
                    if (e.atk === "heal other" || e.atk === "soothe" || e.atk === "rejuvenating circuit" || e.atk === "absorb pain" || e.atk === "share pain" || e.atk === "insulating circuit") {
                      const playerIndex = summary_stats.findIndex((obj => obj.player === e.caster));
                      summary_stats[playerIndex].healsAfterPS = summary_stats[playerIndex].healsAfterPS + 1;
                    }
                  }
                } else if (e.time < (x.atkLog[phaseIndex].hitTime) && e.distance > 0) {
                  const playerIndex = summary_stats.findIndex((obj => obj.player === e.caster));
                  summary_stats[playerIndex].atksBeforePS = (summary_stats[playerIndex].atksBeforePS + 1);
                } else if (e.distance > 0) {
                  const playerIndex = summary_stats.findIndex((obj => obj.player === e.caster));
                  summary_stats[playerIndex].atksIntoPS = (summary_stats[playerIndex].atksIntoPS + 1);
                }
              })
            } else {
              x.atkLog.forEach(e => {
                if (x.team === e.team && e.distance > 0) {
                  if (e.atk === "heal other" || e.atk === "soothe" || e.atk === "rejuvenating circuit" || e.atk === "absorb pain" || e.atk === "share pain" || e.atk === "insulating circuit") {
                    const playerIndex = summary_stats.findIndex((obj => obj.player === e.caster));
                    summary_stats[playerIndex].healsBeforePS = summary_stats[playerIndex].healsBeforePS + 1;
                  }
                } else if (e.distance > 0) {
                  const playerIndex = summary_stats.findIndex((obj => obj.player === e.caster));
                  summary_stats[playerIndex].atksBeforePS = (summary_stats[playerIndex].atksBeforePS + 1);
                }
              })
            }
          })
        }
        const cmCount = () => {
          support_extras.forEach(y => {
            const playerIndex = summary_stats.findIndex((obj => obj.player === y.player))
            const cmIndex = y.actions.findIndex((obj => obj.name === "clear mind"))
            summary_stats[playerIndex].cms = y.actions[cmIndex].count
          })
          summary_stats.sort((a, b) => {
            if (a.otp < b.otp) {
              return 1
            }
            if (a.otp > b.otp) {
              return -1
            }
            return null
          })
          summary_stats.sort((a, b) => {
            if (a.team < b.team) {
              return -1
            }
            if (a.team > b.team) {
              return 1
            }
            return null
          })
        }
        const matchData = {
          map: map,
          gathers: gathers,
          greens_log: greens_log,
          hp_log: hp_log,
          log: log,
          rogue_log: rogue_log,
          score_log: score_log,
          spike_hp: spike_hp,
          spike_log: spike_log,
          spike_stats: spike_stats,
          spike_summary: spike_summary,
          summary: summary,
          summary_stats: summary_stats,
          support_breakdown: support_breakdown,
          support_extras: support_extras,
          support_powers: support_powers,
          support_stats: support_stats,
        }
        let newArr = matches
        newArr.push({ match: rows[1][1], data: matchData })
        setMatches([...newArr])
      })
    }
  }, [matches])
  return (

    <Grid container spacing={3} style={{padding: "10px", background: "linear-gradient(132deg, rgba(0,128,128,1) 13%, rgba(0,139,139,1) 48%, rgba(0,255,255,1) 83%)", minHeight: "100vh"}}>
      <Grid item xs={12}>
        <MatchSelector matches={matches} setMatchIndex={setMatchIndex} matchData={matchData} summaryStats={summaryStats} selectMatch={selectMatch} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <PlayerOverview summaryStats={summaryStats} matchIndex={matchIndex} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Summary summary={summary} />
        <SupportMain summaryStats={summaryStats} />
        <ScoreChart scoreLog={scoreLog} />
      </Grid>


      <Grid item>
      </Grid>
    </Grid>

  )
}
