import React, { useEffect, useState } from 'react'
import epochToDate from '../../helper/epochToDate'
import css from './usersensor.module.css'

function UserSensor(props) {
  const [data, setData] = useState(null)

  useEffect(() => {
    setData(props.data)
  }, [props.data])

  return (
    <div className={css.usersensor__container}>
      <h2>Nilai Sensor</h2>
      <div className={css.line}></div>
      <h3>pH</h3>
      <p>{data && data.ph} </p>
      <h3>TDS</h3>
      <p>{data && data.tds}</p>
      <h3>Kekeruhan</h3>
      <p>{data && data.turb}</p>
      <h3>Suhu</h3>
      <p>{data && data.temp}</p>
      <h3>Debit Utama</h3>
      <p>{data && data.flow}</p>
      <h3>Diambil pada tanggal</h3>
      <p>{epochToDate(data && data.created_at)}</p>
    </div>
  )
}

export default UserSensor
