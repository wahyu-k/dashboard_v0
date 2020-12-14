import React, { useState, useEffect } from 'react'
import css from './userbill.module.css'

function UserBill(props) {
  const [data, setData] = useState(null)

  useEffect(() => {
    setData(props.data)
  }, [props.data])

  return (
    <div className={css.userbill__container}>
      <h3>Tagihan dan Pembayaran</h3>
      <div className={css.line}></div>
      <h1>
        {data &&
          'Rp. ' + (data.bill === null ? 0 : data.bill).toLocaleString() + ',-'}
      </h1>
      {/* // <h1>{data && 'Rp. ' + (data.bill === undefined?  ).toLocaleString() + ',-'}</h1> */}
      <div className={css.allboks}>
        <div className={css.boks}>
          <img
            alt="present"
            src={
              'https://s3.us-east-2.amazonaws.com/assets.siagaairbersih.com/present.png'
            }
          />
          <div className={css.blueboks}>
            <h5>Harga per Liter</h5>
            <h4>{data && 'Rp. ' + data.price?.toLocaleString() + ',-'}</h4>
          </div>
        </div>
        <div className={css.boks}>
          <img
            alt="linegraph"
            src={
              'https://s3.us-east-2.amazonaws.com/assets.siagaairbersih.com/linegraph.png'
            }
          />
          <div className={css.blueboks}>
            <h3>Debit Anda Hari Ini</h3>
            <p className={css.units}>liter</p>
            <h4>
              {data &&
                (data.local[0]?.daily_flow === undefined
                  ? 0
                  : data.local[0].daily_flow)}
            </h4>
          </div>
        </div>
      </div>
      <img
        alt="databack"
        src={
          'https://s3.us-east-2.amazonaws.com/assets.siagaairbersih.com/databack.png'
        }
      />
    </div>
  )
}

export default UserBill
