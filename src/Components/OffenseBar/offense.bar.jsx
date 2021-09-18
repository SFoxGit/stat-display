import React, { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import "./style.css"

export default function OffenseBar(props) {
    const summaryStats = props.summaryStats
    const [data, setData] = useState([])
    useEffect(() => {
        const newArr = []
        summaryStats.forEach(person => {
            if (person.offTiming) {

                newArr.push({
                    name: person.player,
                    early: person.offTiming.early,
                    0.33: person.offTiming.one,
                    0.67: person.offTiming.two,
                    1: person.offTiming.three,
                    1.5: person.offTiming.four,
                    2: person.offTiming.five,
                    over: person.offTiming.six,
                })
            }
        })
        setData([...newArr])
    }, [summaryStats])
    function CustomTooltip({ payload, label, active }) {
        if (active) {
            return (
                <div className="custom-tooltip" style={{backgroundColor: "white", padding: "20px", border: "2px solid black", borderRadius: "10px"}}>
                    <p className="label">{`${label}`}</p>
                    <p className="intro">{`Early  : ${payload[0].value}`}</p>
                    <p className="intro">{`< 0.33 : ${payload[1].value}`}</p>
                    <p className="intro">{`< 0.67 : ${payload[2].value}`}</p>
                    <p className="intro">{`< 1.0  : ${payload[3].value}`}</p>
                    <p className="intro">{`< 1.5  : ${payload[4].value}`}</p>
                    <p className="intro">{`< 2.0  : ${payload[5].value}`}</p>
                    <p className="intro">{`> 2.0  : ${payload[6].value}`}</p>
                    <p className="intro">{`Total  : ${parseFloat(payload[0].value) + parseFloat(payload[1].value) + parseFloat(payload[2].value) + parseFloat(payload[3].value) + parseFloat(payload[4].value) + parseFloat(payload[5].value) + parseFloat(payload[6].value)}`}</p>
                    <p className="desc"></p>
                </div>
            );
        }
        return null;
    }
    return (
        <BarChart
            width={1000}
            height={500}
            data={data}
            margin={{
                top: 20,
                right: 60,
                left: 60,
                bottom: 100
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" stroke="#000000" interval={0} />
            <YAxis type="number" domain={['dataMin', 'dataMax']} stroke="#ffffff" />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ bottom: 0 }} />
            <Bar dataKey="early" stackId="a" fill="#ffef63" />
            <Bar dataKey="0.33" stackId="a" fill="#63e2f0" />
            <Bar dataKey="0.67" stackId="a" fill="#15c9dd" />
            <Bar dataKey="1" stackId="a" fill="#0f8d9a" />
            <Bar dataKey="1.5" stackId="a" fill="#0b646e" />
            <Bar dataKey="2" stackId="a" fill="#063c42" />
            <Bar dataKey="over" stackId="a" fill="#000000" />
        </BarChart>
    );
}
