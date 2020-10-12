import React, { useState } from 'react'
import axios from 'axios'
import css from "./forgetPass.module.css"
import { useHistory } from 'react-router-dom'
import logo_siab from '../../img/register/logo_siab.png'
import { TextField } from '@material-ui/core'

function ForgetPass() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()

  const submitHandler = (event) => {
    setIsLoading(true)
    event.preventDefault()
    sendResetPass()
  }

  const sendResetPass = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/forget_password`,
        {
          receiver: email,
        },
      )

      if (response) {
        alert("We've send you an email to reset your password...")
        history.push('/')
      }
    } catch (error) {
      setIsLoading(false)
      console.error(error.response.data)
    }
  }

  return (
    <div className={css.backdrop}>
      <div className={css.smalldrop}>
        <div className={css.forget__container}>
          <img alt="logo-siab" src={logo_siab}/>
          <div className={css.pass__container}>
            <h1>Lupa Kata Sandi ?</h1>
          </div>
          <form onSubmit={(event) => submitHandler(event)}>
          <label>Email</label>
          <TextField
          placeholder="akun@gmail.com"
          onChange={(event) => setEmail(event.target.value)}
          required
          />

          <button type="submit" disabled={isLoading}>
          Kirim
          </button>
          <p>SIAB Indonesia akan mengirim kode verifikasi ke email anda, silahkan cek email anda</p>
          </form>
        </div>
      
      </div>
    </div>
  )
}

export default ForgetPass
