import React from 'react'
import OffenseBar from '../OffenseBar/offense.bar'

export default function Offense(props) {
    const summaryStats = props.summaryStats
    return (
        <div>
            <OffenseBar summaryStats={summaryStats}/>
        </div>
    )
}
