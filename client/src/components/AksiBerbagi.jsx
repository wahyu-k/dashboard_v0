import React, { useEffect } from 'react'
import axios from 'axios'

function AksiBerbagi() {
  const fetchData = async () => {
    const data = [1, 2]
    try {
      const response = await axios.post(
        'http://localhost:5000/v1/aksi_berbagi',
        {
          device_id: data,
        },
      )

      if (response) {
        console.log(response.data)
      }
    } catch (error) {
      console.error(error.response.data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <h1>Aksi Berbagi x SIAB Indonesia</h1>
    </div>
  )
}

export default AksiBerbagi
