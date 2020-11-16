import React, { useEffect, useState } from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import css from './ComparationApp.module.css'
import axios from 'axios'
import Login from './../../components/Login'

const Lapor = () => {
  const [solution, setSolution] = useState([])
  const [check1, setCheck1] = useState(0)
  const [check2, setCheck2] = useState(0)
  const [check3, setCheck3] = useState(0)
  const [check4, setCheck4] = useState(0)
  const [check5, setCheck5] = useState(0)

  const [state, setState] = useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
    checkedD: false,
    checkedE: false,
  })

  useEffect(() => {
    console.log('state', state)
    if (
      state.checkedA === true &&
      state.checkedB === true &&
      state.checkedC === true &&
      state.checkedD === true &&
      state.checkedE === true
    ) {
      setCheck1(1)
      setCheck2(2)
      setCheck3(3)
      setCheck4(4)
      setCheck5(5)
    } else if (
      state.checkedA === true &&
      state.checkedB === true &&
      state.checkedC === true &&
      state.checkedD === true
    ) {
      setCheck1(1)
      setCheck2(2)
      setCheck3(3)
      setCheck4(4)
    } else if (
      state.checkedA === true &&
      state.checkedB === true &&
      state.checkedC === true &&
      state.checkedE === true
    ) {
      setCheck1(1)
      setCheck2(2)
      setCheck3(3)
      setCheck4(5)
    } else if (
      state.checkedA === true &&
      state.checkedB === true &&
      state.checkedD === true &&
      state.checkedE === true
    ) {
      setCheck1(1)
      setCheck2(2)
      setCheck3(4)
      setCheck4(5)
    } else if (
      state.checkedA === true &&
      state.checkedC === true &&
      state.checkedD === true &&
      state.checkedE === true
    ) {
      setCheck1(1)
      setCheck2(3)
      setCheck3(4)
      setCheck4(5)
    } else if (
      state.checkedB === true &&
      state.checkedC === true &&
      state.checkedD === true &&
      state.checkedE === true
    ) {
      setCheck1(2)
      setCheck2(3)
      setCheck3(4)
      setCheck4(5)
    } else if (
      state.checkedA === true &&
      state.checkedB === true &&
      state.checkedC === true
    ) {
      setCheck1(1)
      setCheck2(2)
      setCheck3(3)
    } else if (
      state.checkedA === true &&
      state.checkedB === true &&
      state.checkedD === true
    ) {
      setCheck1(1)
      setCheck2(2)
      setCheck3(4)
    } else if (
      state.checkedA === true &&
      state.checkedB === true &&
      state.checkedE === true
    ) {
      setCheck1(1)
      setCheck2(2)
      setCheck3(5)
    } else if (
      state.checkedA === true &&
      state.checkedC === true &&
      state.checkedD === true
    ) {
      setCheck1(1)
      setCheck2(3)
      setCheck3(4)
    } else if (
      state.checkedA === true &&
      state.checkedC === true &&
      state.checkedE === true
    ) {
      setCheck1(1)
      setCheck2(3)
      setCheck3(5)
    } else if (
      state.checkedA === true &&
      state.checkedD === true &&
      state.checkedE === true
    ) {
      setCheck1(1)
      setCheck2(4)
      setCheck3(5)
    } else if (
      state.checkedB === true &&
      state.checkedC === true &&
      state.checkedD === true
    ) {
      setCheck1(2)
      setCheck2(3)
      setCheck3(4)
    } else if (
      state.checkedB === true &&
      state.checkedC === true &&
      state.checkedE === true
    ) {
      setCheck1(2)
      setCheck2(3)
      setCheck3(5)
    } else if (
      state.checkedB === true &&
      state.checkedD === true &&
      state.checkedE === true
    ) {
      setCheck1(2)
      setCheck2(3)
      setCheck3(5)
    } else if (
      state.checkedC === true &&
      state.checkedD === true &&
      state.checkedE === true
    ) {
      setCheck1(3)
      setCheck2(4)
      setCheck3(5)
    } else if (state.checkedA === true && state.checkedB === true) {
      setCheck1(1)
      setCheck2(2)
    } else if (state.checkedA === true && state.checkedC === true) {
      setCheck1(1)
      setCheck2(3)
    } else if (state.checkedA === true && state.checkedD === true) {
      setCheck1(1)
      setCheck2(4)
    } else if (state.checkedA === true && state.checkedE === true) {
      setCheck1(1)
      setCheck2(5)
    } else if (state.checkedB === true && state.checkedC === true) {
      setCheck1(2)
      setCheck2(3)
    } else if (state.checkedB === true && state.checkedD === true) {
      setCheck1(2)
      setCheck2(4)
    } else if (state.checkedB === true && state.checkedE === true) {
      setCheck1(2)
      setCheck2(5)
    } else if (state.checkedC === true && state.checkedD === true) {
      setCheck1(3)
      setCheck2(4)
    } else if (state.checkedC === true && state.checkedE === true) {
      setCheck1(3)
      setCheck2(5)
    } else if (state.checkedD === true && state.checkedE === true) {
      setCheck1(4)
      setCheck2(5)
    } else if (state.checkedE === true) {
      setCheck1(5)
    } else if (state.checkedD === true) {
      setCheck1(4)
    } else if (state.checkedC === true) {
      setCheck1(3)
    } else if (state.checkedB === true) {
      setCheck1(2)
    } else if (state.checkedA === true) {
      setCheck1(1)
    }
  }, [state])

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  const handleSubmit = async (event) => {
    try {
      const update = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/users/keluhan`,
        {
          check1: parseInt(check1),
          check2: parseInt(check2),
          check3: parseInt(check3),
          check4: parseInt(check4),
          check5: parseInt(check5),
        },
      )
      console.log(update.data)
      setSolution(update.data)
    } catch (err) {
      console.log('error', err)
    }
  }

  return (
    <div className={css.wolf__container}>
      <h3>Ingin tahu kualitas air yang anda konsumsi ?</h3>
      <div className={css.line}></div>
      <div className={css.input__container}>
        <p>
          Silakan beri keterangan kualitas airmu sesuai kriteria dibawah ini :
        </p>
        <div className={css.lapor__container}>
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
            </div>
          </div>
          <p className={css.login__link__container}>
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
          <p
            className={css.grey__container}
            placeholder="Solusi Kualitas Air Anda"
          >
            {solution.map((element, i) => element.solution + '. ')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Lapor
