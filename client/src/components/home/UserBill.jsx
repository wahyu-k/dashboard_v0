import React, { useState, useEffect } from 'react'
import css from './userbill.module.css'

function UserBill(props) {
  const [data, setData] = useState(null)

  useEffect(() => {
    setData(props.data)
  }, [props.data])

  return (
    <div className={css.userbill__container}>
      <h2>Tagihan dan Pembayaran</h2>
      <div className={css.line}></div>
      <h1>{data && 'Rp. ' + data.bill + ',-'}</h1>
      <h3>Harga per Liter</h3>
      <h4>{data && data.price}</h4>
      <h3>Debit Anda Hari Ini</h3>
      <h4>{data && data.local[0].daily_flow}</h4>
    </div>
  )
}

export default UserBill
