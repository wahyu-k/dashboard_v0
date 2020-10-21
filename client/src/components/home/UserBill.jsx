import React, { useState, useEffect } from 'react'
import present from '../../img/present.png'
import linegraph from './../../img/linegraph.png'
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
      <div className={css.allboks}>
        <div className={css.boks}>
          <img alt="present" src={present} />
          <div className={css.blueboks}>
            <h5>Harga per Liter</h5>
            <h4>{data && data.price}</h4>
          </div>
        </div>
        <div className={css.boks}>
          <img alt="linegraph" src={linegraph} />
          <div className={css.blueboks}>
            <h3>Debit Anda Hari Ini</h3>
            <p className={css.units}>liter</p>
            <h4>{data && data.local[0].daily_flow}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserBill
