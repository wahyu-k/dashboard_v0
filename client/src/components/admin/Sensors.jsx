import React, { useState } from 'react'
import axios from 'axios'
import epochToDate from '../../helper/epochToDate'

function Sensors() {
  const [sensors, setSensors] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getSensorsHandler = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/sensors`,
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

  return (
    <div>
      <h2>Sensors Data</h2>
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
          {sensors.map((sensor) => (
            <tr key={sensor.id}>
              <td>{sensor.id}</td>
              <td>{sensor.device_id}</td>
              <td>{sensor.ph}</td>
              <td>{sensor.tds}</td>
              <td>{sensor.turb}</td>
              <td>{sensor.temp}</td>
              <td>{sensor.flow}</td>
              <td>{epochToDate(sensor.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => getSensorsHandler()} disabled={isLoading}>
        Get Sensors Data
      </button>
    </div>
  )
}

export default Sensors
