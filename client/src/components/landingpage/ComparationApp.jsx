import React, { useState, useEffect } from 'react'
import axios from 'axios'
import earth from './../../img/earth.png'
import land from './../../img/land.png'
import sea from './../../img/sea.png'
import compar from './../../img/compar.png'
import css from './ComparationApp.module.css'
import { TextField } from '@material-ui/core'

const ComparationApp = () => {
  const [input, setInput] = useState(0)
  const [resp, setResp] = useState({
    x: 0,
    y: 0,
    z: 0,
  })

  const a = input * resp.x
  const b = input * resp.y

  useEffect(() => {
    async function fetchData() {
      const resp = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/calc`)
      setResp(resp.data)
    }
    fetchData()
  }, [])

  return (
    <div className={css.comparation__container}>
      <h3>Hitung Biaya Airmu</h3>
      <div className={css.line}></div>
      <div className={css.input__container}>
        <div className={css.flex__row}>
          <div>
            <TextField
              style={{
                width: '250px',
                fontSize: '24px',
              }}
              label="Masukkan Volume Airmu (m³)"
              type="number"
              value={input}
              onFocus={() => input === 0 && setInput('')}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className={css.flex__row}>
              <div>
                <h2>Harga Air SIAB</h2>
                <p className={css.comparation__form}>
                  Rp. {a.toLocaleString()}
                </p>
              </div>
              <div className={css.pdam__container}>
                <h2>Harga Air PDAM</h2>
                <p className={css.comparation__form}>
                  Rp. {b.toLocaleString()}
                </p>
              </div>
            </div>
            <div className={css.flex__row}>
              <div>
                <h2>Anda dapat menghemat</h2>
                <p className={css.comparation__form}>
                  Rp. {(b - a).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <img alt="compar" src={compar} className={css.compar__img} />
        </div>
      </div>

      <div className={css.wolf__container}>
        <h3>Perbandingan Area Air dan Darat di Bumi</h3>
        <div className={css.line}></div>
        <div className={css.wolfram__container}>
          <div className={css.flex__row}>
            <img alt="earth" src={earth} className={css.icon__wolf__img} />
            <div>
              <h2>Luas Area Bumi</h2>
              <p className={css.wolfram__form}>
                5.1 x 10<sup>8</sup> km<sup>2</sup>
              </p>
              <p className={css.wolfram__year}>(2015)</p>
            </div>
          </div>
          <div className={css.land__container}>
            <div className={css.flex__row}>
              <img alt="land" src={land} className={css.icon__wolf__img} />
              <div>
                <h2>Luas Daratan</h2>
                <p className={css.wolfram__form}>
                  1.489 x 10<sup>8</sup> km<sup>2</sup> (29% dari total area
                  bumi)
                </p>
                <p className={css.wolfram__year}>(2015)</p>
              </div>
            </div>
          </div>
          <div className={css.flex__row}>
            <img alt="sea" src={sea} className={css.icon__wolf__img} />
            <div>
              <h2>Luas Perairan</h2>
              <p className={css.wolfram__form}>
                3.611 x 10<sup>8</sup> km<sup>2</sup> (71% dari total area bumi)
              </p>
              <p className={css.wolfram__year}>(2015)</p>
            </div>
          </div>
          <p>Source: Wolfram Alpha Water World</p>
        </div>
      </div>
    </div>
  )
}

export default ComparationApp
