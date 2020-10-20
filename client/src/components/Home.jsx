import React, { useState, useEffect } from 'react'
import Map from './aksiberbagi/Map'
import DashboardSensors from './home/DashboardSensors'

function Home(props) {
  //eslint-disable-next-line
  const [data, setData] = useState([
    {
      name: 'Loading...',
      lat: 0,
      lng: 0,
      total_flow: 0,
    },
  ])

  useEffect(() => {
    props.onView()
  }, [props])

  return (
    <div>
      <Map data={data} />
      <DashboardSensors />
    </div>
  )
}

export default Home
