import React, { useState } from 'react'
import axios from 'axios'
import css from './forgetPass.module.css'
import { useHistory } from 'react-router-dom'
import logo_siab from '../../img/register/logo_siab.png'
import { TextField, Collapse } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import loading from '../../img/loading.gif'

function ForgetPass() {
  const [email, setEmail] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const history = useHistory()

  const submitHandler = (event) => {
    setIsLoading(true)
    setIsSuccess(false)
    setIsError(false)
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
        {
          timeout: 5000,
          timeoutErrorMessage: 'Koneksi timeout, periksa kembali koneksi anda!',
        },
      )

      if (response) {
        setIsSuccess(true)
        setTimeout(() => {
          history.push('/')
        }, 5000)
      }
    } catch (error) {
      setIsLoading(false)
      setIsSuccess(false)
      setIsError(true)
      if (error.code === 'ECONNABORTED') {
        setErrorMsg(error.message)
      } else {
        setErrorMsg(
          'Server kami sedang bermasalah, coba beberapa saat lagi atau hubungi kontak kami!',
        )
      }
    }
  }

  return (
    <div className={css.backdrop}>
      <div className={css.smalldrop}>
        <div className={css.forget__container}>
          <img alt="logo-siab" src={logo_siab} />
          <div className={css.pass__container}>
            <h1>Lupa Kata Sandi ?</h1>
          </div>
          <form onSubmit={(event) => submitHandler(event)}>
            <Collapse in={isSuccess}>
              <Alert severity="success">
                Kami telah mengirim link reset kata sandi ke email anda,
                silahkan cek email anda
              </Alert>
            </Collapse>
            <Collapse in={isError}>
              <Alert severity="error">{errorMsg}</Alert>
            </Collapse>
            <label>Email</label>
            <TextField
              placeholder="akun@gmail.com"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            {!isSuccess ? (
              <button type="submit" disabled={isLoading}>
                {isLoading ? <img alt="loading" src={loading} /> : 'Kirim'}
              </button>
            ) : (
              <button type="submit" disabled={isLoading}>
                Cek Email Anda
              </button>
            )}
            <p>
              SIAB Indonesia akan mengirim kode verifikasi ke email anda,
              silahkan cek email anda
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgetPass
