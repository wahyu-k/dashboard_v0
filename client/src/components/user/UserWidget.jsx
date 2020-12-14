import { Avatar } from '@material-ui/core'
import React from 'react'
import css from './userWidget.module.css'

function UserWidget(props) {
  const { first_name, last_name, email, plan } = props.data

  let firstName = ''
  let lastName = ''

  if (first_name.split(' ').length > 1) {
    firstName = first_name.split(' ')[0]
  } else {
    firstName = first_name
  }

  if (last_name.split(' ').length > 1) {
    lastName = last_name.split(' ')[last_name.split(' ').length - 1]
  } else {
    lastName = last_name
  }

  const fullName = firstName + ' ' + lastName
  const avaName = firstName.charAt(0) + lastName.charAt(0)

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
              src={
                plan === 0
                  ? 'https://s3.us-east-2.amazonaws.com/assets.siagaairbersih.com/userWidget/crown-bw.png'
                  : plan === 1
                  ? 'https://s3.us-east-2.amazonaws.com/assets.siagaairbersih.com/userWidget/crown.png'
                  : 'https://s3.us-east-2.amazonaws.com/assets.siagaairbersih.com/userWidget/dragon.png'
              }
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
