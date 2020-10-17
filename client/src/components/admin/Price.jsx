import React, { useState } from 'react'
import axios from 'axios'

function Price() {
  const [prices, setPrices] = useState(null)

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
        console.log(response.data)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div>
      <h2>Price</h2>
      <button onClick={() => fetchData()}>Fetch Data</button>
    </div>
  )
}

export default Price
