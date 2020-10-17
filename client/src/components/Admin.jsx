import React from 'react'
import Users from './admin/Users'
import Devices from './admin/Devices'
import Sensors from './admin/Sensors'
import UpdatePassword from './settings/UpdatePassword'
import UpdateCompApp from './admin/UpdateCompApp'
import Bills from './admin/Bills'
import Price from './admin/Price'

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
      <Bills />
      <Price />
      <UpdateCompApp />
      <button onClick={() => logoutHandler()}>Logout</button>
    </div>
  )
}

export default Admin
