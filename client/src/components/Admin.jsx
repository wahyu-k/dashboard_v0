import React, { useEffect } from 'react'
import Users from './admin/Users'
import Devices from './admin/Devices'
import Sensors from './admin/Sensors'
import UpdateCompApp from './admin/UpdateCompApp'
import Bills from './admin/Bills'
import Price from './admin/Price'
import Binds from './admin/Binds'

function Admin(props) {
  const logoutHandler = () => {
    localStorage.clear()
    window.location.reload()
  }

  useEffect(() => {
    props.onView()
  }, [props])

  return (
    <div>
      <Users />
      <Devices />
      <Sensors />
      <Bills />
      <Price />
      <UpdateCompApp />
      <Binds />
      <button onClick={() => logoutHandler()}>Logout</button>
    </div>
  )
}

export default Admin
