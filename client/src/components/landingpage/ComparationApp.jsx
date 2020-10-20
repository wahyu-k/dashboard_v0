import React, { useState, useEffect } from 'react'
import axios from 'axios'
import earth from './../../img/earth.png'
import land from './../../img/land.png'
import sea from './../../img/sea.png'
import compar from './../../img/compar.png'
import css from './ComparationApp.module.css'

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
      <h1>Input Perhitungan Biaya Air</h1>
      <div className={css.input__container}>
        <div className={css.flex__row}>
          <div>
            <h2>Masukkan Volume Air (m3)</h2>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className={css.flex__row}>
              <div>
                <h2>Harga Air SIAB</h2>
                <p className={css.comparation__form}>Rp. {a}</p>
              </div>
              <div className={css.pdam__container}>
                <h2>Harga Air PDAM</h2>
                <p className={css.comparation__form}>Rp. {b} </p>
              </div>
            </div>
            <h2>Anda dapat menghemat seharga</h2>
            <p className={css.comparation__form}>Rp. {b - a}</p>
          </div>
          <img alt="compar" src={compar} className={css.compar__img} />
        </div>
      </div>

      <div className={css.wolf__container}>
        <h1>Perbandingan Area Air dan Darat di Bumi</h1>
        <div className={css.wolfram__container}>
          <div className={css.flex__row}>
            <img alt="earth" src={earth} className={css.earth__img} />
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
              <div>
                <h2>Luas Daratan</h2>
                <p className={css.wolfram__form}>
                  1.489 x 10<sup>8</sup> km<sup>2</sup> (29% dari total area
                  bumi)
                </p>
                <p className={css.wolfram__year}>(2015)</p>
              </div>
              <img alt="land" src={land} className={css.land__img} />
            </div>
          </div>
          <div className={css.flex__row}>
            <img alt="sea" src={sea} className={css.sea__img} />
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
