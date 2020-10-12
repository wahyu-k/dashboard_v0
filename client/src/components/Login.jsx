import React, { useState } from 'react'
import axios from 'axios'
import css from './login/login.module.css'
import logo_siab from '../img/login/logo_siab.png'
import banner from '../img/login/banner.png'
import mail_icon from '../img/login/mail_icon.png'
import pass_icon from '../img/login/pass_icon.png'
import { TextField, InputAdornment, Collapse } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

function Login() {
  const [uoe, setUoe] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const submitHandler = async (event) => {
    setIsLoading(true)
    setIsError(false)
    event.preventDefault()
    loginHandler()
  }

  const loginHandler = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/login`,
        {
          uoe,
          password,
        },
      )

      if (response) {
        localStorage.setItem('_s_t', response.data)
        window.location.reload()
      }
    } catch (error) {
      setIsLoading(false)
      setIsError(true)
      console.error(error.response.data)
    }
  }
  return (
    <div className={css.backdrop}>
      <div className={css.login__container}>
        <div className={css.left__container}>
          <div className={css.header__container}>
            <img alt="logo" src={logo_siab} />
            <div>
              <a className={css.menu__masuk} href="/">
                Masuk
              </a>
              <a className={css.menu__daftar} href="/register">
                Daftar
              </a>
            </div>
          </div>
          <form
            className={css.form}
            onSubmit={(event) => submitHandler(event)}
            noValidate
          >
            <Collapse in={isError}>
              <Alert severity="error">
                Kombinasi email/nama akun dengan kata sandi salah!
              </Alert>
            </Collapse>
            <h1>MASUK</h1>
            <label>Email</label>
            <TextField
              onChange={(event) => setUoe(event.target.value)}
              placeholder="alamat email"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img alt="mail" src={mail_icon} />
                  </InputAdornment>
                ),
              }}
            />
            <label>Sandi</label>
            <TextField
              onChange={(event) => setPassword(event.target.value)}
              placeholder="kata sandi"
              type="password"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img alt="password" src={pass_icon} />
                  </InputAdornment>
                ),
              }}
            />
            <button
              className={css.button__login}
              type="submit"
              disabled={isLoading}
            >
              Masuk
            </button>
            <a href="/forget_password">lupa kata sandi?</a>
            <a href="/register">belum punya akun?</a>
          </form>
        </div>
        <div className={css.right__container}>
          <p>Your Digital Water Solution</p>
          <img alt="login-banner" src={banner} />
        </div>
      </div>
    </div>
  )
}

export default Login
