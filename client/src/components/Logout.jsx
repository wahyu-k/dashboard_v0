import React, { useEffect } from 'react'

function Logout() {
  useEffect(() => {
    localStorage.clear()
    window.location.replace('/')
  }, [])

  return <div></div>
}

export default Logout
