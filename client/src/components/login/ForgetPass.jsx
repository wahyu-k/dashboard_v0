import React, { useState, useEffect } from 'react'
import axios from 'axios'
import css from './forgetPass.module.css'
import { useHistory } from 'react-router-dom'
import { TextField, Collapse } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

function ForgetPass(props) {
  const [email, setEmail] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const history = useHistory()

  useEffect(() => {
    props.onView()
  }, [props])

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
          timeout: 20000,
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
    <div className={css.forget__container}>
      <Collapse in={isSuccess}>
        <Alert severity="success">
          Kami telah mengirim link reset kata sandi ke email anda, silahkan cek
          email anda
        </Alert>
      </Collapse>
      <Collapse in={isError}>
        <Alert severity="error">{errorMsg}</Alert>
      </Collapse>
      <form onSubmit={(event) => submitHandler(event)}>
        <label>Email</label>
        <TextField
          placeholder="akun@gmail.com"
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        {!isSuccess ? (
          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <img
                alt="loading"
                src={
                  'https://s3.us-east-2.amazonaws.com/assets.siagaairbersih.com/loading.gif'
                }
              />
            ) : (
              'Kirim'
            )}
          </button>
        ) : (
          <button type="submit" disabled={isLoading}>
            Cek Email Anda
          </button>
        )}
        <p>
          SIAB Indonesia akan mengirim kode verifikasi ke email anda, silahkan
          cek email anda
        </p>
      </form>
      <img
        alt="forpass-img"
        src={
          'https://s3.us-east-2.amazonaws.com/assets.siagaairbersih.com/forgetPass/forget_pass.png'
        }
      />
    </div>
  )
}

export default ForgetPass
