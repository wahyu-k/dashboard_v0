import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './register.modules.css'
import banner from '../../img/register/banner.png'
import logo_siab from '../../img/register/logo_siab.png'
import { TextField } from '@material-ui/core'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()

  const sumbitHandler = () => {
    setIsLoading(true)
    registerHandler()
  }

  const registerHandler = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/register`,
        {
          username,
          email,
          password,
        },
      )

      if (response) {
        history.push('/')
      }
    } catch (error) {
      setIsLoading(false)
      console.error(error.response.data)
    }
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .matches(/^.[a-zA-Z0-9]+$/, {
          message: 'Alphanumeric characters',
          excludeEmptyString: true,
        })
        .min(4)
        .max(20)
        .required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(8).max(100).required(),
    }),
    onSubmit: (values) => {
      setUsername(values.username)
      setEmail(values.email)
      setPassword(values.password)
      sumbitHandler()
    },
  })

  return (
    <div className="backdrop">
      <div className="register-container">
        <div className="left-container">
          <div className="menu-container">
            <img alt="logo-siab" src={logo_siab} />
            <div className="menu-link-container">
              <a className="link-menu-daftar" href="/#">
                Daftar
              </a>
              <a className="link-menu-masuk" href="/#">
                Masuk
              </a>
            </div>
          </div>
          <div className="form-container">
            <h1 className="title">DAFTAR</h1>
            <form onSubmit={formik.handleSubmit}>
              <label>Username</label>
              <TextField
                id="username"
                name="username"
                type="text"
                placeholder="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                required
              />
              <label>Email</label>
              <TextField
                id="email"
                name="email"
                type="text"
                placeholder="akun@gmail.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                required
              />
              <label>Kata Sandi</label>
              <TextField
                id="password"
                name="password"
                type="text"
                placeholder="kata sandi"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                required
              />

              <br />
              <button type="submit" disabled={isLoading}>
                Register
              </button>
              <a className="cancel" href="/#">
                sudah punya akun?
              </a>
            </form>
          </div>
        </div>
        <div className="right-container">
          <p className="subtitle">Your Digital Water Solution</p>
          <img alt="banner" src={banner} />
        </div>
      </div>
    </div>
  )
}

export default Register
