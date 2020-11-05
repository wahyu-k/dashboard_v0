import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'
import { Equation, defaultErrorHandler } from 'react-equation'

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
    <Fragment>
      <h2>Biaya yang dapat anda hemat jika me</h2>
      <h3>Masukkan Volume Air (m3)</h3>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <h3>Harga Air SIAB</h3>
      <p>{a}</p>
      <h3>Harga Air PDAM</h3>
      <p>{b} </p>
      <h3>Anda dapat menghemat seharga</h3>
      <p>{b - a}</p>
      <h1>Perbandingan Area Air dan Darat di Bumi</h1>
      <h2>Luas Area Bumi</h2>
      <Equation
        value="5.1 x 10^8 km^2 (2015)"
        errorHandler={defaultErrorHandler}
      />
      <h2>Luas Daratan</h2>
      <Equation
        value="1.489 x 10^8 km^2 (29% dari total area bumi) (2015)"
        errorHandler={defaultErrorHandler}
      />
      <h2>Luas Perairan</h2>
      <Equation
        value="3.611 x 10^8 km^2 (71% dari total area bumi) (2015)"
        errorHandler={defaultErrorHandler}
      />
    </Fragment>
  )
}

export default ComparationApp
