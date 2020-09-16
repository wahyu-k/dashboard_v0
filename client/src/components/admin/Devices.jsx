import React, { useState } from 'react'
import axios from 'axios'
import epochToDate from '../../helper/epochToDate'
import RegisterDevice from './RegisterDevice'
import EditDevices from './EditDevices'

function Devices() {
  const [devices, setDevices] = useState([])
  const [addDevice, setAddDevice] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [editedData, setEditedData] = useState(null)

  const getDevicesHandler = async () => {
    setIsLoading(true)
    setEditedData(null)
    setAddDevice(false)
    try {
      const response = await axios.get('http://localhost:5000/v1/devices')
      if (response) {
        setIsLoading(false)
        setDevices(response.data)
      }
    } catch (error) {
      setIsLoading(false)
      console.error(error.response.data)
    }
  }

  return (
    <div>
      <h2>Device Data</h2>
      <table>
        <tbody>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>User Id</th>
            <th>Created At</th>
            <th>Edit</th>
          </tr>
          {devices.map((device, i) => {
            if (i !== editedData) {
              return (
                <tr key={i}>
                  <td>{device.id}</td>
                  <td>{device.name}</td>
                  <td>{device.lat}</td>
                  <td>{device.lng}</td>
                  <td>{device.user_id}</td>
                  <td>{epochToDate(device.created_at)}</td>
                  <td>
                    <button onClick={() => setEditedData(i)}>Edit</button>
                  </td>
                </tr>
              )
            } else {
              return (
                <EditDevices
                  key={i}
                  data={device}
                  onFinish={() => getDevicesHandler()}
                  onCancel={() => setEditedData(null)}
                />
              )
            }
          })}
          {addDevice && (
            <RegisterDevice
              onStart={() => setIsLoading(true)}
              onFinish={() => getDevicesHandler()}
              onCancel={() => setAddDevice(false)}
            />
          )}
        </tbody>
      </table>
      <button onClick={() => setAddDevice(true)} disabled={isLoading}>
        Add Device
      </button>
      <button onClick={() => getDevicesHandler()} disabled={isLoading}>
        Get All Device Data
      </button>
    </div>
  )
}

export default Devices
