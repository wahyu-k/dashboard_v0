import React, { useEffect } from 'react'
import DashboardSensors from './home/DashboardSensors'

function Home(props) {
  useEffect(() => {
    props.onView()
  }, [props])

  return (
    <div>
      <DashboardSensors />
    </div>
  )
}

export default Home
