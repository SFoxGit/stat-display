import React from 'react'
import { DataGrid } from '@mui/x-data-grid';


const columns = [
  { field: 'caster', headerName: 'Caster', width: 120, },
  { field: 'atk', headerName: 'Atk', width: 120, },
  { field: 'distance', headerName: 'Dist', type: 'number', width: 120, },
  { field: 'time', headerName: 'Time', type: 'number', width: 120, },
  { field: 'hitTime', headerName: 'Hit Time', type: 'number', width: 120, },
  { field: 'team', headerName: 'Team', width: 120, },
]
export default function SpikeIndividual(props) {
  const {atkData} = props
  return (
    <div style={{ height: "100%", width: '50%', backgroundColor: "white" }}>
      {atkData.length ? <DataGrid
        rows={atkData}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick={true}
      /> : null}
    </div>
  )
}
