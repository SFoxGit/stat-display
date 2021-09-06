import React, { useEffect, useState } from 'react'
import { parse } from 'papaparse';

const registry = [
  { "file": "/Data/1.cohdemo.csv" },
  { "file": "/Data/2.cohdemo.csv" },
  { "file": "/Data/3.cohdemo.csv" },
  { "file": "/Data/4.cohdemo.csv" },
  { "file": "/Data/5.cohdemo.csv" },
  { "file": "/Data/6.cohdemo.csv" },
  { "file": "/Data/7.cohdemo.csv" },
]

export default function MatchSelector() {
  const [matches, setMatches] = useState([])

  useEffect(() => {
    if (!matches.length) {

      registry.forEach(async obj => {
        const response = await fetch(obj.file)
        const reader = response.body.getReader()
        const result = await reader.read() // raw array
        const decoder = new TextDecoder('utf-8')
        const csv = decoder.decode(result.value) // the csv text
        const results = parse(csv, { header: true }) // object with { data, errors, meta }
        const rows = results.data // array of objects
        console.log(rows)
        let newArr = matches
        newArr.push(rows[1].map)
        setMatches([...newArr])
      })
    }
  }, [matches])
  return (
    <div>

    </div>
  )
}
