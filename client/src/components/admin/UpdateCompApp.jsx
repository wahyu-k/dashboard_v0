import React, { useState, useEffect } from 'react'
import axios from 'axios'

function UpdateCompApp() {
  const [x1, setX1] = useState('')
  const [y1, setY1] = useState('')
  const [z1, setZ1] = useState('')

  const onSubmitForm = async (e) => {
    e.preventDefault()
    try {
      const update = await axios.put('http://localhost:5000/v1/calc', {
        x: parseInt(x1),
        y: parseInt(y1),
        z: parseInt(z1),
      })
      console.log(update.data)
    } catch (err) {
      alert(err.response.data)
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await axios.get('http://localhost:5000/v1/calc')
        setX1(resp.data.x)
        setY1(resp.data.y)
        setZ1(resp.data.z)
      } catch (err) {
        console.error(err.data.message)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1>UpdateCompApp</h1>
      <h2 className="text-center mt-5">Update Nilai Variabel</h2>
      <h3 className="text-center mt-5">Nilai Variabel X</h3>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="real"
          className="form-control"
          onChange={(e) => setX1(e.target.value)}
          value={x1}
        />
        <h3 className="text-center mt-5">Nilai Variabel Y</h3>
        <input
          type="real"
          className="form-control"
          value={y1}
          onChange={(e) => setY1(e.target.value)}
        />
        <h3 className="text-center mt-5">Nilai Variabel Z</h3>
        <input
          type="real"
          className="form-control"
          value={z1}
          onChange={(e) => setZ1(e.target.value)}
        />
        <button className="btn btn-success">Ubah Nilai</button>
      </form>
    </div>
  )
}

export default UpdateCompApp
