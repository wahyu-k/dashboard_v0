import React, { useState, useEffect } from 'react'
import axios from 'axios'
import epochToDate from '../../helper/epochToDate'
import RegisterDevice from './devices/RegisterDevice'
import EditDevices from './devices/EditDevices'
// import { DataGrid } from '@material-ui/data-grid'
import Button from '@material-ui/core/Button'

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
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/devices`,
      )
      if (response) {
        setIsLoading(false)
        setDevices(response.data)
      }
    } catch (error) {
      setIsLoading(false)
      console.error(error.response.data)
    }
  }

  // const columns = [
  //   { field: 'id', headerName: 'ID', width: 70 },
  //   { field: 'name', headerName: 'Username', width: 100 },
  //   { field: 'email', headerName: 'Email', width: 230 },
  //   {
  //     field: 'lat',
  //     headerName: 'Lat',
  //     width: 80,
  //   },
  //   {
  //     field: 'lng',
  //     headerName: 'Lng',
  //     width: 80,
  //   },
  //   {
  //     field: 'user_id',
  //     headerName: 'Plan',
  //     width: 80,
  //   },
  //   {
  //     field: 'created_at',
  //     headerName: 'Created At',
  //     width: 250,
  //     valueGetter: (params) => `${epochToDate(params.getValue('created_at'))}`,
  //   },
  //   {
  //     field: 'edit',
  //     headerName: 'Edit',
  //     width: 90,
  //     renderCell: (params) => (
  //       <Button variant="contained" color="primary" size="small">
  //         Edit
  //       </Button>
  //     ),
  //   },
  // ]

  useEffect(() => {
    getDevicesHandler()
  }, [])

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
      {/* {
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={devices} columns={columns} pageSize={5} />
        </div>
      } */}
      <Button
        onClick={() => setAddDevice(true)}
        variant="contained"
        color="primary"
        type="submit"
      >
        Add Device
      </Button>
      <button onClick={() => setAddDevice(true)} disabled={isLoading}>
        Add Device
      </button>
    </div>
  )
}

export default Devices
