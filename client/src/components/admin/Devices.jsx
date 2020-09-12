import React, { useState } from 'react'
import axios from 'axios'
import epochToDate from '../../helper/epochToDate'
import RegisterDevice from './RegisterDevice'

function Devices() {
  const [devices, setDevices] = useState([])
  const [addDevice, setAddDevice] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const getDevicesHandler = async () => {
    setIsLoading(true)
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

  const addDeviceHandler = () => {
    setAddDevice(true)
    getDevicesHandler()
  }

  const saveHandler = async (data) => {
    setIsLoading(true)
    try {
      const response = await axios.post(
        'http://localhost:5000/v1/devices',
        data,
      )
      if (response) {
        setIsLoading(false)
        setAddDevice(false)
        getDevicesHandler()
      }
    } catch (error) {
      setIsLoading(false)
      console.error(error.response.data)
    }
  }

  const cancelHandler = () => {
    setAddDevice(false)
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
            <th>Created At</th>
            <th>Edit</th>
          </tr>
          {devices.map((device) => (
            <tr key={device.id}>
              <td>{device.id}</td>
              <td>{device.name}</td>
              <td>{device.lat}</td>
              <td>{device.lng}</td>
              <td>{epochToDate(device.created_at)}</td>
              <td>
                <button>Edit</button>
              </td>
            </tr>
          ))}
          {addDevice && (
            <RegisterDevice
              saveHandler={(data) => saveHandler(data)}
              cancelHandler={() => cancelHandler()}
              isLoading={isLoading}
            />
          )}
        </tbody>
      </table>
      <button onClick={() => addDeviceHandler()} disabled={isLoading}>
        Add Device
      </button>
      <button onClick={() => getDevicesHandler()} disabled={isLoading}>
        Get All Device Data
      </button>
    </div>
  )
}

export default Devices
