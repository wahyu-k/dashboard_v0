import React, { useEffect, useState } from 'react'
import labu from '../../img/labu.png'
import specimen from './../../img/specimen.png'
import suhu from './../../img/suhu.png'
import uji from './../../img/uji.png'
import css from './usersensor.module.css'

function UserSensor(props) {
  const [data, setData] = useState(null)

  useEffect(() => {
    setData(props.data)
  }, [props.data])

  return (
    <div className={css.usersensor__container}>
      <h3>Nilai Sensor</h3>
      <div className={css.line}></div>
      <div className={css.allboks}>
        <div className={css.boks}>
          <img alt="labu" src={labu} />
          <div className={css.blueboks}>
            <h4>pH</h4>
            <p className={css.nominal}>{data ? data.ph : '0'}</p>
          </div>
        </div>
        <div className={css.boks}>
          <img alt="specimen" src={specimen} />
          <div className={css.blueboks}>
            <h3>Kekeruhan</h3>
            <p className={css.units}>ppm</p>
            <p className={css.nominal}>{data ? data.turb : '0'}</p>
          </div>
        </div>
        <div className={css.boks}>
          <img alt="specimen" src={specimen} />
          <div className={css.blueboks}>
            <h3>Debit Utama</h3>
            <p className={css.units}>liter</p>
            <p className={css.nominal}>{data ? data.flow : '0'}</p>
          </div>
        </div>
        <div className={css.boks}>
          <img alt="uji" src={uji} />
          <div className={css.blueboks}>
            <h3>TDS</h3>
            <p className={css.units}>uS/mm</p>
            <p className={css.nominal}>{data ? data.tds : '0'}</p>
          </div>
        </div>
        <div className={css.boks}>
          <img alt="suhu" src={suhu} />
          <div className={css.blueboks}>
            <h3>Suhu</h3>
            <p className={css.units}>
              <sup>o</sup>C
            </p>
            <p className={css.nominal}>{data ? data.temp : '0'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserSensor
