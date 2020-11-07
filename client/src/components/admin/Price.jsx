import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { DataGrid } from '@material-ui/data-grid'
import Button from '@material-ui/core/Button'

function Price() {
  const [prices, setPrices] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/price`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('_s_t'),
          },
        },
      )
      if (response) {
        setPrices(response.data)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'price', headerName: 'Price', width: 130 },
    {
      field: 'device_id_list',
      headerName: 'device_id',
      width: 250,
      valueGetter: (params) =>
        `${params.getValue('device_id_list').toString()}`,
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
    fetchData()
  }, [])

  return (
    <div>
      <h2>Price</h2>
      {/* <table>
        <tbody>
          <tr>
            <td>Id</td>
            <td>Price</td>
            <td>User Id</td>
          </tr>
          {prices.map((price, i) => (
            <tr key={i}>
              <td>{price.id}</td>
              <td>{price.price}</td>
              <td>
                <p>{price.device_id_list.toString()}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      {
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={prices} columns={columns} pageSize={5} />
        </div>
      }
    </div>
  )
}

export default Price
