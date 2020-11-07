import React, { useState, useEffect } from 'react'
import present from '../../img/present.png'
import linegraph from './../../img/linegraph.png'
import css from './userbill.module.css'
import databack from './../../img/databack.png'

function UserBill(props) {
  const [data, setData] = useState(null)

  useEffect(() => {
    setData(props.data)
  }, [props.data])

  return (
    <div className={css.userbill__container}>
      <h3>Tagihan dan Pembayaran</h3>
      <div className={css.line}></div>
      <h1>{data && 'Rp. ' + data.bill.toLocaleString() + ',-'}</h1>
      <div className={css.allboks}>
        <div className={css.boks}>
          <img alt="present" src={present} />
          <div className={css.blueboks}>
            <h5>Harga per Liter</h5>
            <h4>{data && 'Rp. ' + data.price.toLocaleString() + ',-'}</h4>
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
      <img alt="databack" src={databack} />
    </div>
  )
}

export default UserBill
