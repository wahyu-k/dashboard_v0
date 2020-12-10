import React, { useState, useEffect } from 'react'
// import { DataGrid } from '@material-ui/data-grid'
import axios from 'axios'
// import epochToDate from '../../helper/epochToDate'
import css from './Reports.module.css'

function Reports() {
  const [reports, setReports] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  const [page] = useState(0)
  const rowsPerPage = 10
  // const [isEdit, setIsEdit] = useState(false)

  // const columns = [
  //   { field: 'id', headerName: 'ID', width: 70 },
  //   { field: 'user_id', headerName: 'User_id', width: 130 },
  //   { field: 'uri', headerName: 'uri', width: 80 },
  //   {
  //     field: 'comments',
  //     headerName: 'comments',
  //     width: 80,
  //   },
  //   {
  //     field: 'loc',
  //     headerName: 'loc',
  //     width: 80,
  //   },
  //   {
  //     field: 'created_at',
  //     headerName: 'created_at',
  //     width: 80,
  //     valueGetter: (params) => `${epochToDate(params.getValue('created_at'))}`,
  //   },
  //   {
  //     field: 'modified_at',
  //     headerName: 'modified At',
  //     width: 250,
  //     valueGetter: (params) => `${epochToDate(params.getValue('modified_at'))}`,
  //   },
  //   // {
  //   //   field: 'edit',
  //   //   headerName: 'Edit',
  //   //   width: 90,
  //   //   renderCell: (params) => (
  //   //     <Button variant="contained" color="primary" size="small">
  //   //       Edit
  //   //     </Button>
  //   //   ),
  //   // },
  // ]

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/reports`,
        )
        setReports(resp.data)
        console.log('resp.data', resp.data)
      } catch (err) {
        console.error(err.data.message)
      }
    }
    fetchData()
  }, [])

  return (
    <div className={css.reports__container}>
      <table>
        <tbody>
          <tr>
            <th>Id</th>
            <th>User Id</th>
            <th>URI</th>
            <th>Comments</th>
            <th>Loc</th>
            <th>Created_at</th>
            <th>Modified_at</th>
          </tr>
          {reports
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((theReports, i) => {
              return (
                <tr key={i}>
                  <td>{theReports.id}</td>
                  <td>{theReports.user_id}</td>
                  <td>
                    {theReports.uri.map((dev, a) => (
                      <td key={a}>
                        <img
                          alt="img"
                          src={dev}
                          className={css.singlepreview}
                        />
                      </td>
                    ))}
                  </td>
                  <td>{theReports.comments}</td>
                  <td>{theReports.loc}</td>
                  <td>{theReports.created_at}</td>
                  <td>{theReports.modified_at}</td>
                  {/* <td>
                    <button onClick={() => setIsEdit(true)}>Edit</button>
                  </td> */}
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default Reports
