import React, { useState, useEffect } from 'react'
import axios from 'axios'
import epochToDate from '../../helper/epochToDate'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import css from './UpdateCompApp.module.css'

function UpdateCompApp() {
  const [x1, setX1] = useState('')
  const [y1, setY1] = useState('')
  const [z1, setZ1] = useState('')
  const [date, setDate] = useState('')

  const onSubmitForm = async (e) => {
    e.preventDefault()
    try {
      const update = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/v1/calc`,
        {
          x: parseInt(x1),
          y: parseInt(y1),
          z: parseInt(z1),
        },
      )
      console.log(update.data)
    } catch (err) {
      alert(err.response.data)
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/calc`,
        )
        setX1(resp.data.x)
        setY1(resp.data.y)
        setZ1(resp.data.z)
        setDate(resp.data.modified_at)
      } catch (err) {
        console.error(err.data.message)
      }
    }
    fetchData()
  }, [])

  return (
    <div className={css.comp__app}>
      <h2>Update Harga per Meter Kubik</h2>
      <form
        className={css.update__comp__container}
        onSubmit={(e) => onSubmitForm(e)}
      >
        <div>
          <TextField
            style={{
              width: '95%',
            }}
            label="Harga Air SIAB"
            value={x1}
            onChange={(e) => setX1(e.target.value)}
          />
        </div>
        <div>
          <TextField
            style={{
              width: '95%',
            }}
            label="Harga Air PDAM"
            value={y1}
            onChange={(e) => setY1(e.target.value)}
          />
        </div>
        <div>
          <TextField
            style={{
              width: '95%',
            }}
            label="Nilai Variabel Z"
            value={z1}
            onChange={(e) => setZ1(e.target.value)}
          />
        </div>

        <Button variant="contained" color="primary" type="submit">
          Ubah Nilai
        </Button>
        {/* <h3>Harga Air SIAB</h3>
        <input type="real" onChange={(e) => setX1(e.target.value)} value={x1} />
        <h3>Harga Air PDAM</h3>
        <input type="real" value={y1} onChange={(e) => setY1(e.target.value)} />
        <h3>Nilai Variabel Z</h3>
        <input type="real" value={z1} onChange={(e) => setZ1(e.target.value)} />
        <button>Ubah Nilai</button> */}
      </form>
      {/* <TextField
        style={{
          width: '95%',
        }}
        label="Dimodifikasi pada tanggal"
        value={epochToDate(date)}
      /> */}
      <div align="center">
        <h3>Dimodifikasi pada tanggal</h3>
        <p>{epochToDate(date)}</p>
      </div>
    </div>
  )
}

export default UpdateCompApp
