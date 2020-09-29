import React from 'react'
import Users from './admin/Users'
import Devices from './admin/Devices'
import Sensors from './admin/Sensors'
import UpdatePassword from './settings/UpdatePassword'
import UpdateCompApp from './admin/UpdateCompApp'

function Admin() {
  const logoutHandler = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <UpdatePassword />
      <Users />
      <Devices />
      <Sensors />
      <UpdateCompApp />
      <button onClick={() => logoutHandler()}>Logout</button>
    </div>
  )
}

export default Admin
