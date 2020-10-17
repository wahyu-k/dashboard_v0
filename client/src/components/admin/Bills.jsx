import React, { useState } from 'react'
import axios from 'axios'

function Bills() {
  const [bill, setBill] = useState(null)

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/bill?device_id=1`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('_s_t'),
          },
        },
      )
      if (response) {
        setBill(response.data)
        console.log(response.data)
      }
    } catch (error) {
      console.error(error.message)
    }
  }
  return (
    <div>
      <h2>Bill</h2>
      <button onClick={() => fetchData()}>Fetch Data</button>
    </div>
  )
}

export default Bills
