import React from 'react'

function Home() {
  const logoutHandler = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div>
      <h1>Home</h1>
      <h2>Siaga Air Bersih</h2>
      <button onClick={() => logoutHandler()}>Logout</button>
    </div>
  )
}

export default Home
