import React, { useEffect } from 'react'
import UpdatePassword from '../settings/UpdatePassword'
import UpdatePersonalData from '../settings/UpdatePersonalData'
import UpdateUsername from '../settings/UpdateUsername'
import css from './SettingAccount.module.css'

function SettingAccount(props) {
  useEffect(() => {
    props.onView()
  }, [props])

  return (
    <div className={css.setting}>
      <div className={css.setting__container}>
        <div>
          <UpdatePersonalData />
        </div>
        <div>
          <UpdatePassword />
        </div>
        <div>
          <UpdateUsername />
        </div>
      </div>
    </div>
  )
}

export default SettingAccount
