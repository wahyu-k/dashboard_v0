import React from 'react'
import UpdatePassword from './settings/UpdatePassword'
import UpdateUsername from './settings/UpdateUsername'

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
      <button onClick={() => logoutHandler()}>Logout</button>
    </div>
  )
}

export default Home
