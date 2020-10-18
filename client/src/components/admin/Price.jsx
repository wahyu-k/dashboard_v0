import React, { useState } from 'react'
import axios from 'axios'

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

  return (
    <div>
      <h2>Price</h2>
      <table>
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
      </table>
      <button onClick={() => fetchData()}>Fetch Data</button>
    </div>
  )
}

export default Price
