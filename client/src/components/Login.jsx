import React, { useState } from 'react'
import axios from 'axios'
import './login/login.modules.css'
import logo_siab from '../img/login/logo_siab.png'
import banner from '../img/login/banner.png'
import {
  MuiThemeProvider,
  createMuiTheme,
  TextField,
  makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles({
  textField: {
    marginBottom: 10,
  },
})

function Login() {
  const classes = useStyles()
  const theme = createMuiTheme({
    typography: {
      fontFamily: '"Poppins", sans-serif',
    },
  })

  const [uoe, setUoe] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const submitHandler = async (event) => {
    setIsLoading(true)
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
      console.error(error.response.data)
    }
  }
  return (
    <MuiThemeProvider theme={theme}>
      <div className="backdrop">
        <div className="login-container">
          <div className="left-login-container">
            <div className="top-menu-container">
              <img className="siab-logo" alt="SIAB Logo" src={logo_siab} />
              <div className="menu-container">
                <a className="text-masuk" href="/#">
                  Masuk
                </a>
                <a className="text-daftar" href="/register">
                  Daftar
                </a>
              </div>
            </div>
            <form
              className="form-container"
              onSubmit={(event) => submitHandler(event)}
            >
              <h1 className="text-masuk-form">MASUK</h1>
              <label>Email</label>
              <TextField
                className={classes.textField}
                onChange={(event) => setUoe(event.target.value)}
                placeholder="alamat email"
                required
              />
              <label>Sandi</label>
              <TextField
                className={classes.textField}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="kata sandi"
                type="password"
                required
              />
              <button
                className="button-login"
                type="submit"
                disabled={isLoading}
              >
                Masuk
              </button>
              <a href="/forget_password" className="a-additional">
                lupa kata sandi?
              </a>
              <a href="/register" className="a-additional">
                belum punya akun?
              </a>
            </form>
          </div>
          <div className="right-login-container">
            <p>Your Digital Water Solution</p>
            <img alt="login-banner" src={banner} />
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  )
}

export default Login
