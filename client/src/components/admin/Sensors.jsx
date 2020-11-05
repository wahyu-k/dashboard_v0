import React, { useState, useEffect } from 'react'
import axios from 'axios'
import epochToDate from '../../helper/epochToDate'
import { DataGrid } from '@material-ui/data-grid'
import Button from '@material-ui/core/Button'

function Sensors() {
  const [sensors, setSensors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  // const [page, setPage] = useState(0)
  // const rowsPerPage = 10

  const getSensorsHandler = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/sensors`,
        { time: 0 },
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

  // const pagination = async (p) => {
  //   if (p === 'home') {
  //     setPage(0)
  //   } else if (p === 'before') {
  //     if (page === 0) {
  //       setPage(0)
  //     } else if (sensors.length <= rowsPerPage) {
  //       setPage(0)
  //     } else {
  //       setPage(page - 1)
  //     }
  //   } else if (p === 'after') {
  //     if (sensors.length <= rowsPerPage) {
  //       setPage(0)
  //     } else if (page >= sensors.length / rowsPerPage - 1) {
  //       setPage(Math.ceil(sensors.length / rowsPerPage - 1))
  //     } else {
  //       setPage(page + 1)
  //     }
  //   } else if (p === 'last') {
  //     if (sensors.length <= rowsPerPage) {
  //       setPage(0)
  //     } else {
  //       setPage(Math.ceil(sensors.length / rowsPerPage - 1))
  //     }
  //   }
  // }

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

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'device_id', headerName: 'Device_id', width: 130 },
    { field: 'ph', headerName: 'ph', width: 80 },
    {
      field: 'tds',
      headerName: 'tds',
      width: 80,
    },
    {
      field: 'turb',
      headerName: 'turb',
      width: 80,
    },
    {
      field: 'temp',
      headerName: 'temp',
      width: 80,
    },
    {
      field: 'created_at',
      headerName: 'Created At',
      width: 250,
      valueGetter: (params) => `${epochToDate(params.getValue('created_at'))}`,
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 90,
      renderCell: (params) => (
        <Button variant="contained" color="primary" size="small">
          Edit
        </Button>
      ),
    },
  ]

  useEffect(() => {
    getSensorsHandler()
  }, [])

  return (
    <div>
      <h2>Sensors Data</h2>
      <Button
        onClick={() => filter('day')}
        variant="contained"
        color="primary"
        type="submit"
      >
        Filter 1 hari
      </Button>
      <Button
        onClick={() => filter('week')}
        variant="contained"
        color="primary"
        type="submit"
      >
        Filter 7 hari
      </Button>
      <Button
        onClick={() => filter('month')}
        variant="contained"
        color="primary"
        type="submit"
      >
        Filter 1 bulan
      </Button>
      <Button
        onClick={() => filter('year')}
        variant="contained"
        color="primary"
        type="submit"
      >
        Filter 1 tahun
      </Button>
      <Button
        onClick={() => filter()}
        variant="contained"
        color="primary"
        type="submit"
      >
        All Data
      </Button>
      {/*       
      <button onClick={() => filter('day')}>Filter 1 hari</button>
      <button onClick={() => filter('week')}>Filter 7 hari</button>
      <button onClick={() => filter('month')}>Filter 30 hari</button>
      <button onClick={() => filter('year')}>Filter 1 tahun</button>
      <button onClick={() => filter()}>All Data</button><table>
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
      </table> */}
      {
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={sensors}
            columns={columns}
            pageSize={10}
            disabled={isLoading}
          />
        </div>
      }
      {/* {sensors.length === 0 ? null : (
        <div>
          <button onClick={() => pagination('home')}>Halaman Awal</button>
          <button onClick={() => pagination('before')}>
            Halaman Sebelumnya
          </button>
          <button onClick={() => pagination('after')}>
            Halaman Setelahnya
          </button>
          <button onClick={() => pagination('last')}>Halaman Terakhir</button>
        </div>
      )} */}
    </div>
  )
}

export default Sensors
