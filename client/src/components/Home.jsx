import React, { useEffect } from 'react'
import DashboardSensors from './home/DashboardSensors'
import Img from './landingpage/Img'
// import Profile from './home/Profile'
import css from './Home.module.css'

function Home(props) {
  useEffect(() => {
    props.onView()
  }, [props])

  return (
    <div>
      <DashboardSensors />
      <Img />
      {/* <Profile /> */}
      <div className={css.footer}>
        <p>Copyright © 2020 SIAB Indonesia</p>
        <p>Powered by SIAB Indonesia</p>
      </div>
    </div>
  )
}

export default Home
