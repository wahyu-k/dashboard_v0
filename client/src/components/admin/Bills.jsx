import React, { useState } from 'react'
import axios from 'axios'
import epochToDate from '../../helper/epochToDate'

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
  return (
    <div>
      <h2>Bill</h2>
      <table>
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
      </table>
      <button onClick={() => fetchData()}>Fetch Data</button>
    </div>
  )
}

export default Bills
