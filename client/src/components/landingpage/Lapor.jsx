import React, { useEffect, useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import css from './ComparationApp.module.css'
import axios from 'axios'
// import Login from './../../components/Login'

const Lapor = () => {
  // const [checked, setChecked] = useState(true)
  const [solution, setSolution] = useState('')
  const [x, setX] = useState(0)

  // const handleChange = (event) => {
  //   setChecked(event.target.checked)
  // }

  // const [qual, setQual] = useState('')

  const [state, setState] = useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
    checkedD: false,
    checkedE: false,
  })

  useEffect(() => {
    console.log('state', state)
  }, [state])

  const handleChange = async (event) => {
    await setState({ ...state, [event.target.name]: event.target.checked })
  }

  const handleSubmit = async (event) => {
    try {
      if (checkedA === true) {
        setX(1)
      } else if (checkedB === true) {
        setX(2)
      } else if (checkedC === true) {
        setX(3)
      } else if (checkedD === true) {
        setX(4)
      } else if (checkedE === true) {
        setX(5)
      }
      const update = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/users/keluhan`,
        {
          checked: parseInt(x),
        },
      )
      console.log(update.data)
    } catch (err) {
      console.log('error', err)
    }
  }

  // const handleSubmit = async (centang) => {
  //   let checked = 0
  //   switch (centang) {
  //     // case checkedA:
  //     // case {checkedA===true}:
  //     case { checkedA: true }:
  //       // case checkedA === true:
  //       // case (checkedA: true):
  //       checked = 1
  //       break
  //     case checkedB: true:
  //       checked = 2
  //       break
  //   }
  //   const resp = await axios.post(
  //     `${process.env.REACT_APP_BASE_URL}/v1/users/keluhan`,
  //     {
  //       headers: {
  //         Authorization: 'Bearer ' + localStorage.getItem('_s_t'),
  //       },
  //       params: {
  //         checked,
  //       },
  //     },
  //   )
  //   setSolution(resp.data)
  //   console.log('solution', solution)
  // }

  const { checkedA, checkedB, checkedC, checkedD, checkedE } = state

  // const centang = async (checked) => {
  //   let check = 0
  //   switch (checked) {
  //     case 'checkedA===true':
  //       check = 86400000
  //       break
  //     case 'checkedB===true':
  //       check = 86400000 * 7
  //       break
  //     case 'checkedC===true':
  //       check = 86400000 * 30
  //       break
  //     case 'checkedD===true':
  //       check = 86400000 * 365
  //       break
  //     case 'checkedE===true':
  //       check = 86400000 * 365
  //       break
  //     case 'checkedF===true':
  //       check = 86400000 * 365
  //       break
  //     default:
  //       check = 0
  //       break
  //   }
  //   const resp = await axios.get(
  //     `${process.env.REACT_APP_BASE_URL}/v1/users/keluhan`,
  //     {
  //       headers: {
  //         Authorization: 'Bearer ' + localStorage.getItem('_s_t'),
  //       },
  //       params: {
  //         keluhan,
  //       },
  //     },
  //   )
  //   setData(resp.data.primary)
  // }

  return (
    <div className={css.wolf__container}>
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
        <div className={css.quality__container}>
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
          </div>
          <p className={css.login__link__container}>
            {/* Jika ingin melakukan konsultasi lebih lanjut terkait kualitas air
            dan solusinya silahkan klik INGIN MENYERTAKAN FOTO/LOKASI? (INGIN
            KONSULTASI LEBIH LANJUT?) */}
            <a href="login"> INGIN MENYERTAKAN FOTO?</a>
          </p>
        </div>
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
      </div>
    </div>
  )
}

export default Lapor
