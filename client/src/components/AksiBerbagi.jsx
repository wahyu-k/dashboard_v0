import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Map from './aksiberbagi/Map'
import RecapWidget from './aksiberbagi/RecapWidget'

function AksiBerbagi() {
  const [data, setData] = useState([
    {
      name: 'Loading...',
      lat: 0,
      lng: 0,
      total_flow: 0,
    },
  ])

  const [totalFlow, setTotalFlow] = useState(0)
  const [deviceActive, setDeviceActive] = useState(0)

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
        setData(response.data)
        let totalFlowData = 0
        response.data.map((data) => (totalFlowData += data.total_flow))
        setTotalFlow(totalFlowData)
        setDeviceActive(data.length)
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
      <Map data={data} />
      <RecapWidget title="Total Flow" data={totalFlow} />
      <RecapWidget title="People Served" data={Math.round(totalFlow / 2.53)} />
      <RecapWidget title="Device Active" data={deviceActive} />
    </div>
  )
}

export default AksiBerbagi
