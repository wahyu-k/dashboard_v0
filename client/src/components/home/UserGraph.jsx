import React, { useState, useEffect } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
} from 'recharts'
import { TablePagination } from '@material-ui/core'
import axios from 'axios'
import css from './usergraph.module.css'
import epochToDate from '../../helper/epochToDate'

function UserGraph(props) {
  const [data, setData] = useState(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
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
    setData(resp.data.primary)
  }

  useEffect(() => {
    setData(props.data)
  }, [props.data])

  return (
    <div className={css.usergraph__container}>
      <h2>Grafik Penggunaan Air Anda</h2>
      <div className={css.line}></div>
      <LineChart
        width={1000}
        height={400}
        data={
          data &&
          data.local.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        }
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Legend verticalAlign="top" height={36} />
        <Line
          name="Debit (Liter)"
          type="monotone"
          dataKey="daily_flow"
          stroke="#382"
          yAxisId={0}
        />
      </LineChart>

      <button onClick={() => filter('day')}>Filter 1 hari</button>
      <button onClick={() => filter('week')}>Filter 7 hari</button>
      <button onClick={() => filter('month')}>Filter 30 hari</button>
      <button onClick={() => filter('year')}>Filter 1 tahun</button>
      <button onClick={() => filter()}>All Data</button>
      <table>
        <tbody>
          <tr>
            <th>Id</th>
            <th>Debit</th>
            <th>Dibuat pada Tanggal</th>
          </tr>
          {data &&
            data.local
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((theGetSens, i) => (
                <tr key={i}>
                  <td>{theGetSens.id}</td>
                  <td>{theGetSens.daily_flow}</td>
                  <td>{epochToDate(theGetSens.created_at)}</td>
                </tr>
              ))}
        </tbody>
      </table>
      <TablePagination
        component="div"
        count={data === null ? 0 : data.local.length}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  )
}

export default UserGraph
