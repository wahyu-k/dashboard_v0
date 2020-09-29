import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'

const ComparationApp = () => {
  const [input, setInput] = useState('')
  const [resp, setResp] = useState({
    x: 0,
    y: 0,
    z: 0,
  })

  const a = input * resp.x * resp.y * resp.z

  useEffect(() => {
    async function fetchData() {
      const resp = await axios.get('http://localhost:5000/v1/calc')
      setResp(resp.data)
    }
    fetchData()
  }, [])

  return (
    <Fragment>
      <h1>SIAB INDONESIA</h1>
      <h2>Input Perhitungan Biaya Air</h2>
      <h3>Harga Air</h3>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <h3>Harga Air SIAB</h3>
      <p>{a}</p>
      <h3>Harga Air PDAM</h3>
      <p>{input} </p>
      <h3>Anda dapat menghemat seharga</h3>
      <p>{input - a}</p>
    </Fragment>
  )
}

export default ComparationApp
