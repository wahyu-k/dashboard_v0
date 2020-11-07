import React, { useEffect } from 'react'
import Users from './admin/Users'
import Devices from './admin/Devices'
import Sensors from './admin/Sensors'
import UpdateCompApp from './admin/UpdateCompApp'
import Bills from './admin/Bills'
import Price from './admin/Price'
import Binds from './admin/Binds'
import css from './Admin.module.css'
// import Button from '@material-ui/core/Button'

function Admin(props) {
  // const logoutHandler = () => {
  //   localStorage.clear()
  //   window.location.reload()
  // }

  useEffect(() => {
    props.onView()
  }, [props])

  return (
    <div className={css.admin__container}>
      <Users />
      <Devices />
      <Sensors />
      <Bills />
      <Price />
      <UpdateCompApp />
      <Binds />
      <div className={css.footer}>
        <p>Copyright © 2020 SIAB Indonesia</p>
        <p>Powered by SIAB Indonesia</p>
      </div>
      {/* <Button
        onClick={() => logoutHandler()}
        variant="contained"
        color="primary"
        type="submit"
      >
        Logout
      </Button> */}
    </div>
  )
}

export default Admin
