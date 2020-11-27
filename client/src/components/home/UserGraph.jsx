/* eslint-disable */
import React, { useState, useEffect } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
// import { TablePagination } from '@material-ui/core'
import axios from 'axios'
import css from './usergraph.module.css'
import { DataGrid } from '@material-ui/data-grid'
import epochToDate from '../../helper/epochToDate'

function UserGraph(props) {
  const [data, setData] = useState(null)
  const page = 0
  const rowsPerPage = 10

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage)
  // }

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10))
  //   setPage(0)
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

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'daily_flow', headerName: 'Debit Harian', width: 130 },
    {
      field: 'created_at',
      headerName: 'Waktu',
      width: 250,
      valueGetter: (params) => `${epochToDate(params.getValue('created_at'))}`,
    },
  ]

  return (
    <div className={css.usergraph__container}>
      <h3>Grafik Penggunaan Air</h3>
      <div className={css.line}></div>

      <ResponsiveContainer width="99%" height={300}>
        <LineChart
          data={
            data &&
            data.local.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage,
            )
          }
          margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
        >
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Legend verticalAlign="top" height={36} />
          <YAxis />
          {/* <XAxis dataKey="created_at" /> */}
          <Line
            name="Debit (Liter)"
            type="monotone"
            dataKey="daily_flow"
            stroke="#382"
            yAxisId={0}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className={css.tabel}>
        {/* <button onClick={() => filter('day')}>Hari</button>
        <button onClick={() => filter('week')}>Minggu</button>
        <button onClick={() => filter('month')}>Bulan</button>
        <button onClick={() => filter('year')}>Tahun</button>
        <button onClick={() => filter()}>Semua Data</button> */}

        {/* <table>
        <tbody>
          <tr>
            <th className={css.table_id}>Id</th>
            <th className={css.th}>Debit</th>
            <th className={css.th}>Dibuat pada Tanggal</th>
          </tr>
          {data &&
            data.local
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((theGetSens, i) => (
                <tr key={i}>
                  <td className={css.td}>{theGetSens.id}</td>
                  <td className={css.td}>{theGetSens.daily_flow}</td>
                  <td className={css.td}>
                    {epochToDate(theGetSens.created_at)}
                  </td>
                </tr>
              ))}
        </tbody>
      </table> */}

        {data && (
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={data.local} columns={columns} pageSize={10} />
          </div>
        )}
      </div>

      {/* <TablePagination
        component="div"
        count={data === null ? 0 : data.local.length}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      /> */}
    </div>
  )
}

export default UserGraph
