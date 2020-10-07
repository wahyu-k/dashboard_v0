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
// import TablePagination from '@material-ui/core/TablePagination'

function DashboardSensors() {
  const [getSens, setGetSens] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [latest, setLatest] = useState({
    ph: 0,
    tds: 0,
    turb: 0,
    temp: 0,
    flow: 0,
    device_id: 0,
    created_at: 0,
  })
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage)
  // }

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10))
  //   setPage(0)
  // }

  // const endPage = (event, endPage) => {
  //   setPage(endPage)
  // }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, getSens.length - page * rowsPerPage)

  const pagination = async (p) => {
    if (p === 'home') {
      setPage(0)
    } else if (p === 'before') {
      if (page === 0) {
        setPage(0)
      } else {
        setPage(page - 1)
      }
    } else if (p === 'after') {
      if (page === getSens.length / rowsPerPage - 1) {
        setPage(getSens.length / rowsPerPage - 1)
      } else {
        setPage(page + 1)
      }
    } else if (p === 'last') {
      setPage(getSens.length / rowsPerPage - 1)
    }
  }

  const filter = async (duration) => {
    if (duration === 'day') {
      const ro = await axios.post('http://localhost:5000/v1/users/sensors', {
        device_id: 1,
        time: 86400000,
      })
      setGetSens(ro.data)
    } else if (duration === 'week') {
      const ro7 = await axios.post('http://localhost:5000/v1/users/sensors', {
        device_id: 1,
        time: 604800000,
      })
      setGetSens(ro7.data)
    } else if (duration === 'month') {
      const ro30 = await axios.post('http://localhost:5000/v1/users/sensors', {
        device_id: 1,
        time: 86400000 * 30,
      })
      setGetSens(ro30.data)
    } else if (duration === 'year') {
      const roy = await axios.post('http://localhost:5000/v1/users/sensors', {
        device_id: 1,
        time: 86400000 * 366,
      })
      setGetSens(roy.data)
    } else {
      const all = await axios.post('http://localhost:5000/v1/users/sensors', {
        device_id: 1,
        time: 0,
      })
      setGetSens(all.data)
    }
  }

  useEffect(() => {
    async function fetchData() {
      // const late = await axios.post('http://localhost:5000/v1/users/sensors', {
      //   device_id: 1,
      //   time: 1,
      // })
      // setLatest(late.data)
      // console.log('latest', late)
      // const latest = await axios.post('http://localhost:5000/v1/users/sensors')
      // setGetSens(latest.data)
      const getSens = await axios.post(
        'http://localhost:5000/v1/users/sensors',
        { device_id: 1, time: 0 },
      )
      setGetSens(getSens.data)
      setLatest(getSens.data[0])
      // console.log(getSens.data[0].ph)
    }
    fetchData()
  }, [])

  return (
    <div>
      <div>
        <h1>Premium User</h1>
        <h2 className="text-center mt-5">Monitoring</h2>
        <h3 className="text-center mt-5">Nilai PH</h3>
        <p>{latest.ph} </p>
        <h3 className="text-center mt-5">Nilai TDS</h3>
        <p>{latest.tds}</p>
        <h3 className="text-center mt-5">Nilai Turb</h3>
        <p>{latest.turb}</p>
        <h3 className="text-center mt-5">Nilai Temp</h3>
        <p>{latest.temp}</p>
        <h3 className="text-center mt-5">Nilai Flow</h3>
        <p>{latest.flow}</p>
        <h3 className="text-center mt-5">Device ID</h3>
        <p>{latest.device_id}</p>
        <h3 className="text-center mt-5">Diambil pada tanggal</h3>
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
          {emptyRows > 0 && (
            <tr style={{ height: 53 * emptyRows }}>
              <td colSpan={6} />
            </tr>
          )}
        </tbody>
      </table>
      <p>{Math.round(page + 1)}</p>
      <button onClick={() => pagination('home')}>Halaman Awal</button>
      <button onClick={() => pagination('before')}>Halaman Sebelumnya</button>
      <button onClick={() => pagination('after')}>Halaman Setelahnya</button>
      <button onClick={() => pagination('last')}>Halaman Terakhir</button>
      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={getSens.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      /> */}
    </div>
  )
}

export default DashboardSensors
