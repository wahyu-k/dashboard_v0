import React, { useState, useEffect } from 'react'
import axios from 'axios'
import epochToDate from '../../helper/epochToDate'

function DashboardSensors() {
  const [dash, setDash] = useState('')

  useEffect(() => {
    async function fetchData() {
      const dash = await axios.get('http://localhost:5000/v1/calc/dashboard')
      setDash(dash.data)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1>Premium User</h1>
      <h2 className="text-center mt-5">Monitoring</h2>
      <h3 className="text-center mt-5">Nilai PH</h3>
      <p>{dash.ph} </p>
      <h3 className="text-center mt-5">Nilai TDS</h3>
      <p>{dash.tds}</p>
      <h3 className="text-center mt-5">Nilai Turb</h3>
      <p>{dash.turb}</p>
      <h3 className="text-center mt-5">Nilai Temp</h3>
      <p>{dash.temp}</p>
      <h3 className="text-center mt-5">Nilai Flow</h3>
      <p>{dash.flow}</p>
      <h3 className="text-center mt-5">Device ID</h3>
      <p>{dash.device_id}</p>
      <h3 className="text-center mt-5">Diambil pada tanggal</h3>
      <p>{epochToDate(dash.created_at)}</p>
    </div>
  )
}

export default DashboardSensors
