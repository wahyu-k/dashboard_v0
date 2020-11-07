import React, { useState, useEffect } from 'react'
import axios from 'axios'
import epochToDate from '../../helper/epochToDate'
import { DataGrid } from '@material-ui/data-grid'
import Button from '@material-ui/core/Button'

function Bills() {
  const [bills, setBills] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/bill`,
        {
          params: {
            device_id: 1,
          },
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('_s_t'),
          },
        },
      )
      if (response) {
        setBills(response.data)
        console.log(response.data)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'device_id', headerName: 'Device_id', width: 130 },
    { field: 'daily_flow', headerName: 'daily_flow', width: 230 },
    {
      field: 'daily_bill',
      headerName: 'daily_bill',
      width: 80,
    },
    {
      field: 'payment',
      headerName: 'payment',
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

  return (
    <div>
      <h2>Bill</h2>
      {/* <table>
        <tbody>
          <tr>
            <td>Id</td>
            <td>Device Id</td>
            <td>Daily Flow</td>
            <td>Daily Bill</td>
            <td>payment</td>
            <td>Created Date</td>
          </tr>
          {bills.map((bill, i) => (
            <tr key={i}>
              <td>{bill.id}</td>
              <td>{bill.device_id}</td>
              <td>{bill.daily_flow}</td>
              <td>{bill.daily_bill}</td>
              <td>{bill.payment}</td>
              <td>{epochToDate(bill.payment)}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
      {
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={bills} columns={columns} pageSize={10} />
        </div>
      }
    </div>
  )
}

export default Bills
