import React, { useEffect } from 'react'
import DashboardSensors from './home/DashboardSensors'
import css from './Home.module.css'

function Home(props) {
  useEffect(() => {
    props.onView()
  }, [props])

  return (
    <div>
      <DashboardSensors />
      <div className={css.footer}>
        <p>Copyright © 2020 SIAB Indonesia</p>
        <p>Powered by SIAB Indonesia</p>
      </div>
    </div>
  )
}

export default Home
