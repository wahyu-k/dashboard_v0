import React, { useState, useEffect } from 'react'
import axios from 'axios'
import epochToDate from '../../helper/epochToDate'

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
    <div>
      <h1>UpdateCompApp</h1>
      <h2>Update Nilai Variabel</h2>
      <h3>Nilai Variabel X</h3>
      <form onSubmit={onSubmitForm}>
        <input type="real" onChange={(e) => setX1(e.target.value)} value={x1} />
        <h3>Nilai Variabel Y</h3>
        <input type="real" value={y1} onChange={(e) => setY1(e.target.value)} />
        <h3>Nilai Variabel Z</h3>
        <input type="real" value={z1} onChange={(e) => setZ1(e.target.value)} />
        <button>Ubah Nilai</button>
      </form>
      <h3>Dimodifikasi pada tanggal</h3>
      <p>{epochToDate(date)}</p>
    </div>
  )
}

export default UpdateCompApp
