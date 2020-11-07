import React, { useState, useEffect } from 'react'
import axios from 'axios'
import earth from './../../img/earth.png'
import land from './../../img/land.png'
import sea from './../../img/sea.png'
import compar from './../../img/compar.png'
import css from './ComparationApp.module.css'
import { TextField } from '@material-ui/core'
// import Checkbox from '@material-ui/core/Checkbox'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import Button from '@material-ui/core/Button'
// import Login from './../../components/Login'

const ComparationApp = () => {
  const [input, setInput] = useState(0)
  const [resp, setResp] = useState({
    x: 0,
    y: 0,
    z: 0,
  })
  // const [checked, setChecked] = useState(true)
  // const [solution, setSolution] = useState('')

  // const handleChange = (event) => {
  //   setChecked(event.target.checked)
  // }
  // const [qual, setQual] = useState('')

  // const [state, setState] = useState({
  //   checkedA: false,
  //   checkedB: false,
  //   checkedC: false,
  //   checkedD: false,
  //   checkedE: false,
  //   checkedF: false,
  // })

  // const handleChange = (event) => {
  //   setState({ ...state, [event.target.name]: event.target.checked })
  // }

  // const handleSubmit = (event) => {
  //   setSolution('abc')
  // }

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
      <h3>Input Perhitungan Biaya Air</h3>
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
            <div className={css.flex__row}>
              <div>
                <h2>Anda dapat menghemat</h2>
                <p className={css.comparation__form}>Rp. {b - a}</p>
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
      {/* <div className={css.wolf__container}>
        <h3>Ingin tahu kualitas air yang anda konsumsi ?</h3>
        <div className={css.line}></div>
        <div className={css.input__container}>
          <p>
            Silakan beri keterangan kualitas airmu sesuai kriteria dibawah ini :
          </p>
          {/* <Checkbox
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        /> */}
      {/* <div className={css.quality__container}>
        <div className={css.quality__column__container}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedA}
                onChange={handleChange}
                name="checkedA"
                color="primary"
              />
            }
            label="Berwarna kuning"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedB}
                onChange={handleChange}
                name="checkedB"
                color="primary"
              />
            }
            label="Berkerak ketika direbus"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedC}
                onChange={handleChange}
                name="checkedC"
                color="primary"
              />
            }
            label="Memiliki rasa"
          />
        </div>
        <div className={css.quality__column__container}>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedD}
                onChange={handleChange}
                name="checkedD"
                color="primary"
              />
            }
            label="Memiliki bau"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkedE}
                onChange={handleChange}
                name="checkedE"
                color="primary"
              />
            }
            label="Keruh"
          />
          {/* <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedF}
                    onChange={handleChange}
                    name="checkedF"
                    color="primary"
                  />
                }
                label="Lain-lain"
              /> */}

      {/* <div className={css.quality__container}>
          <div className={css.grey__box}></div>
          <p>Berwarna kuning</p>
        </div>
        <div>
          <div className={css.grey__box}></div>
          <p>Berkerak ketika direbus</p>
        </div>
        <div>
          <div className={css.grey__box}></div>
          <p>Memiliki rasa</p>
        </div>
        <div>
          <div className={css.grey__box}></div>
          <p>Memiliki bau</p>
        </div>
        <div>
          <div className={css.grey__box}></div>
          <p>Keruh</p>
        </div>
        <div>
          <div className={css.grey__box}></div>
          <p>Lain-lain</p>
        </div> */}
      {/* <div className={css.keterangan__quality}>
            <TextField
              style={{
                width: '100%',
              }}
              label="Keterangan kualitas air anda"
              value={qual}
              onChange={(e) => setQual(e.target.value)}
            />
          </div> */}
      {/* <p className={css.login__link__container}>
            Jika ingin melakukan konsultasi lebih lanjut terkait kualitas air
            dan solusinya silahkan klik INGIN MENYERTAKAN FOTO/LOKASI? (INGIN
            KONSULTASI LEBIH LANJUT?)
            <a href="login"> LOGIN</a> terlebih dahulu
          </p>
          <div align="center">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}
            >
              Submit Kualitas Air Anda
            </Button>
          </div>
        </div>
      </div>

      <div className={css.wolf__container}>
        <h3>Solusi kualitas air anda :</h3>
        <div className={css.line}></div>
        <div className={css.input__container}>
          <p className={css.grey__container}>
            {solution}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea unde et
            impedit voluptatem ipsum deserunt, eos exercitationem, a quaerat
            eius in vitae quas culpa molestiae reiciendis consequuntur sequi
            quasi dignissimos.Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Ea unde et impedit voluptatem ipsum deserunt, eos
            exercitationem, a quaerat eius in vitae quas culpa molestiae
            reiciendis consequuntur sequi quasi dignissimos. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Ea unde et impedit voluptatem
            ipsum deserunt, eos exercitationem, a quaerat eius in vitae quas
            culpa molestiae reiciendis consequuntur sequi quasi dignissimos.
          </p>
        </div>
      </div> */}
    </div>
  )
}

export default ComparationApp
