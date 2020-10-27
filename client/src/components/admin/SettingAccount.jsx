import React, { useEffect } from 'react'
import UpdatePassword from '../settings/UpdatePassword'
import UpdatePersonalData from '../settings/UpdatePersonalData'
import UpdateUsername from '../settings/UpdateUsername'

function SettingAccount(props) {
  useEffect(() => {
    props.onView()
  }, [props])

  return (
    <div>
      <UpdateUsername />
      <UpdatePassword />
      <UpdatePersonalData />
    </div>
  )
}

export default SettingAccount
