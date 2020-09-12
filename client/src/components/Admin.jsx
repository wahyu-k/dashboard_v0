import React, { useState } from 'react'
import axios from 'axios'
import epochToDate from '../helper/epochToDate'

function Admin() {
  const [users, setUsers] = useState([])
  const [devices, setDevices] = useState([])
  const [sensors, setSensors] = useState([])

  const logoutHandler = () => {
    localStorage.clear()
    window.location.reload()
  }

  const getUsersHandler = async () => {
    try {
      const response = await axios.get('http://localhost:5000/v1/admin/logins')
      if (response) {
        setUsers(response.data)
      }
    } catch (error) {
      console.error(error.response.data)
    }
  }

  const getDevicesHandler = async () => {
    try {
      const response = await axios.get('http://localhost:5000/v1/devices')
      if (response) {
        setDevices(response.data)
      }
    } catch (error) {
      console.error(error.response.data)
    }
  }

  const getSensorsHandler = async () => {
    try {
      const response = await axios.get('http://localhost:5000/v1/sensors')
      if (response) {
        setSensors(response.data)
      }
    } catch (error) {
      console.error(error.response.data)
    }
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <h2>User Data</h2>
      <table>
        <tbody>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Created At</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{epochToDate(user.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => getUsersHandler()}>Get All User Data</button>
      <h2>Device Data</h2>
      <table>
        <tbody>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Created At</th>
          </tr>
          {devices.map((device) => (
            <tr key={device.id}>
              <td>{device.id}</td>
              <td>{device.name}</td>
              <td>{device.lat}</td>
              <td>{device.lng}</td>
              <td>{epochToDate(device.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => getDevicesHandler()}>Get All User Data</button>
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
      <button onClick={() => getSensorsHandler()}>Get Sensors Data</button>
      <button onClick={() => logoutHandler()}>Logout</button>
    </div>
  )
}

export default Admin
