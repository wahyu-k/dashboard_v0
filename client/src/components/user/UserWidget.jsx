import { Avatar } from '@material-ui/core'
import React from 'react'
import css from './userWidget.module.css'
import crown from '../../img/userWidget/crown.png'
import crown_bw from '../../img/userWidget/crown-bw.png'
import dragon from '../../img/userWidget/dragon.png'

function UserWidget(props) {
  const { first_name, last_name, email, plan } = props.data

  const fullName = first_name + ' ' + last_name
  const avaName = first_name.charAt(0) + last_name.charAt(0)

  return (
    <div className={css.widget__container}>
      <div>
        <div>
          <Avatar>{avaName}</Avatar>
        </div>
        <div className={css.name__container}>
          <h3>{fullName}</h3>
          <p>{email}</p>
          <div className={css.plan__container}>
            <img
              alt="crown-img"
              src={plan === 0 ? crown_bw : plan === 1 ? crown : dragon}
            />
            <div>
              {plan === 0
                ? 'Free User'
                : plan === 1
                ? 'Premium User'
                : plan === 2
                ? 'Pengelola'
                : 'Admin SIAB'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserWidget
