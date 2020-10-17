import React, { useState } from 'react'
import axios from 'axios'
import epochToDate from '../../helper/epochToDate'

function Sensors() {
  const [sensors, setSensors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(0)
  const rowsPerPage = 10

  const getSensorsHandler = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/sensors`,
        {time:0},
      )
      if (response) {
        setIsLoading(false)
        setSensors(response.data)
      }
    } catch (error) {
      setIsLoading(false)
      console.error(error.response.data)
    }
  }

  const pagination = async (p) => {
    if (p === 'home') {
      setPage(0)
    } else if (p === 'before') {
      if (page === 0) {
        setPage(0)
      } else if (sensors.length <= rowsPerPage) {
        setPage(0)
      } else {
        setPage(page - 1)
      }
    } else if (p === 'after') {
      if (sensors.length <= rowsPerPage) {
        setPage(0)
      } else if (page >= sensors.length / rowsPerPage - 1) {
        setPage(Math.ceil(sensors.length / rowsPerPage - 1))
      } else {
        setPage(page + 1)
      }
    } else if (p === 'last') {
      if (sensors.length <= rowsPerPage) {
        setPage(0)
      } else {
        setPage(Math.ceil(sensors.length / rowsPerPage - 1))
      }
    }
  }

  const filter = async (duration) => {
    let time = 0
    switch (duration) {
      case 'day':
        time = 86400000
        break
      case 'week':
        time = 86400000 * 7
        break
      case 'month':
        time = 86400000 * 30
        break
      case 'year':
        time = 86400000 * 365
        break
      default:
        time = 0
        break
    }
    const resp = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/v1/sensors`,
      {
        time,
      },
    )
    setSensors(resp.data)
  }

  return (
    <div>
      <h2>Sensors Data</h2>
      <button onClick={() => filter('day')}>Filter 1 hari</button>
      <button onClick={() => filter('week')}>Filter 7 hari</button>
      <button onClick={() => filter('month')}>Filter 30 hari</button>
      <button onClick={() => filter('year')}>Filter 1 tahun</button>
      <button onClick={() => filter()}>All Data</button>
      <table>
        <tbody>
          <tr>
            <th>Id</th>
            <th>Device Id</th>
            <th>pH</th>
            <th>TDS</th>
            <th>Turbidity</th>
            <th>Temperature</th>
            <th>Flow</th>
            <th>Created At</th>
          </tr>
          {sensors
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((theSensor, i) => (
            <tr key={i}>
              <td>{theSensor.id}</td>
              <td>{theSensor.device_id}</td>
              <td>{theSensor.ph}</td>
              <td>{theSensor.tds}</td>
              <td>{theSensor.turb}</td>
              <td>{theSensor.temp}</td>
              <td>{theSensor.flow}</td>
              <td>{epochToDate(theSensor.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {sensors.length===0? null : <div>
        
        <button onClick={() => pagination('home')}>Halaman Awal</button>
        <button onClick={() => pagination('before')}>Halaman Sebelumnya</button>
        <button onClick={() => pagination('after')}>Halaman Setelahnya</button>
        <button onClick={() => pagination('last')}>Halaman Terakhir</button>
        
        </div>}
      
      <button onClick={() => getSensorsHandler()} disabled={isLoading}>
        Get Sensors Data
      </button>
    </div>
  )
}

export default Sensors
