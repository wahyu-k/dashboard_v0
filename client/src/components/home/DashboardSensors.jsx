import React, { useState, useEffect } from 'react'
import axios from 'axios'
import epochToDate from '../../helper/epochToDate'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
} from 'recharts'

function DashboardSensors() {
  const [getSens, setGetSens] = useState([])
  const [page, setPage] = useState(0)
  const rowsPerPage = 10
  const [latest, setLatest] = useState({
    ph: 0,
    tds: 0,
    turb: 0,
    temp: 0,
    flow: 0,
    device_id: 0,
    created_at: 0,
  })

  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, getSens.length - page * rowsPerPage)

  const pagination = async (p) => {
    if (p === 'home') {
      setPage(0)
    } else if (p === 'before') {
      if (page === 0) {
        setPage(0)
      } else if (getSens.length <= rowsPerPage) {
        setPage(0)
      } else {
        setPage(page - 1)
      }
    } else if (p === 'after') {
      if (getSens.length <= rowsPerPage) {
        setPage(0)
      } else if (page >= getSens.length / rowsPerPage - 1) {
        setPage(Math.ceil(getSens.length / rowsPerPage - 1))
      } else {
        setPage(page + 1)
      }
    } else if (p === 'last') {
      if (getSens.length <= rowsPerPage) {
        setPage(0)
      } else {
        setPage(Math.ceil(getSens.length / rowsPerPage - 1))
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
    const resp = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/v1/users/sensors`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('_s_t'),
        },
        params: {
          time,
        },
      },
    )
    setGetSens(resp.data)
  }

  async function fetchData() {
    const getSens = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/v1/users/sensors`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('_s_t'),
        },
        params: {
          time: 0,
        },
      },
    )
    setGetSens(getSens.data)
    setLatest(getSens.data[0])
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <div>
        <h1>Premium User</h1>
        <h2>Monitoring</h2>
        <h3>Nilai PH</h3>
        <p>{latest.ph} </p>
        <h3>Nilai TDS</h3>
        <p>{latest.tds}</p>
        <h3>Nilai Turb</h3>
        <p>{latest.turb}</p>
        <h3>Nilai Temp</h3>
        <p>{latest.temp}</p>
        <h3>Nilai Flow</h3>
        <p>{latest.flow}</p>
        <h3>Device ID</h3>
        <p>{latest.device_id}</p>
        <h3>Diambil pada tanggal</h3>
        <p>{epochToDate(latest.created_at)}</p>
      </div>

      <LineChart
        width={1000}
        height={400}
        data={getSens.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage,
        )}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <XAxis dataKey="getSens" />

        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Legend verticalAlign="top" height={36} />
        <Line
          name="ph"
          type="monotone"
          dataKey="ph"
          stroke="#ff7300"
          yAxisId={0}
        />
        <Line
          name="tds"
          type="monotone"
          dataKey="tds"
          stroke="#387908"
          yAxisId={1}
        />
        <Line
          name="turb"
          type="monotone"
          dataKey="turb"
          stroke="#783408"
          yAxisId={2}
        />
        <Line
          name="temp"
          type="monotone"
          dataKey="temp"
          stroke="#111128"
          yAxisId={3}
        />
        <Line
          name="flow"
          type="monotone"
          dataKey="flow"
          stroke="#299998"
          yAxisId={4}
        />
      </LineChart>

      <h2>Tabel Monitoring</h2>
      <button onClick={() => filter('day')}>Filter 1 hari</button>
      <button onClick={() => filter('week')}>Filter 7 hari</button>
      <button onClick={() => filter('month')}>Filter 30 hari</button>
      <button onClick={() => filter('year')}>Filter 1 tahun</button>
      <button onClick={() => filter()}>All Data</button>
      <table>
        <tbody>
          <tr>
            <th>Id</th>
            <th>PH</th>
            <th>TDS</th>
            <th>Turb</th>
            <th>Temp</th>
            <th>Flow</th>
            <th>Device ID</th>
            <th>Dibuat pada tanggal</th>
          </tr>
          {getSens
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((theGetSens, i) => (
              <tr key={i}>
                <td>{theGetSens.id}</td>
                <td>{theGetSens.ph}</td>
                <td>{theGetSens.tds}</td>
                <td>{theGetSens.turb}</td>
                <td>{theGetSens.temp}</td>
                <td>{theGetSens.flow}</td>
                <td>{theGetSens.device_id}</td>
                <td>{epochToDate(theGetSens.created_at)}</td>
              </tr>
            ))}
          {/* {emptyRows > 0 && (
            <tr style={{ height: 53 * emptyRows }}>
              <td colSpan={6} />
            </tr>
          )} */}
        </tbody>
      </table>
      <p>
        Halaman {Math.round(page + 1)} dari{' '}
        {Math.ceil(getSens.length / rowsPerPage)} halaman
      </p>
      <button onClick={() => pagination('home')}>Halaman Awal</button>
      <button onClick={() => pagination('before')}>Halaman Sebelumnya</button>
      <button onClick={() => pagination('after')}>Halaman Setelahnya</button>
      <button onClick={() => pagination('last')}>Halaman Terakhir</button>
    </div>
  )
}

export default DashboardSensors
