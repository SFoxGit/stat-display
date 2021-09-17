import React from 'react'
import OffenseBar from '../OffenseBar/offense.bar'
import OffenseTable from '../OffenseTable/offense.table'

export default function Offense(props) {
    const summaryStats = props.summaryStats
    return (
        <div>
            <OffenseBar summaryStats={summaryStats}/>
            <OffenseTable summaryStats={summaryStats}/>
        </div>
    )
}
