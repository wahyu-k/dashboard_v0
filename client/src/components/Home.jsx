import React from 'react'
import ComparationApp from './home/ComparationApp'
import DashboardSensors from './home/DashboardSensors'
import UpdatePassword from './settings/UpdatePassword'
import UpdatePersonalData from './settings/UpdatePersonalData'
import UpdateUsername from './settings/UpdateUsername'
import LandingPageWidget from './home/LandingPageWidget'

function Home() {
  const logoutHandler = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div>
      <h1>Home</h1>
      <h2>Siaga Air Bersih</h2>
      <UpdateUsername />
      <UpdatePassword />
      <UpdatePersonalData />
      <ComparationApp />
      <DashboardSensors />
      <LandingPageWidget />
      <button onClick={() => logoutHandler()}>Logout</button>
    </div>
  )
}

export default Home
