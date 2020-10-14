import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import css from './register.module.css'
import banner from '../../img/register/banner.png'
import logo_siab from '../../img/register/logo_siab.png'
import loading from '../../img/loading.gif'
import { TextField, Collapse } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const history = useHistory()

  const registerHandler = async ({ username, email, password }) => {
    setIsLoading(true)
    setIsSuccess(false)
    setIsError(false)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/register`,
        {
          username,
          email,
          password,
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
        }, 3000)
      }
    } catch (error) {
      setIsLoading(false)
      setIsError(true)
      if (error.code === 'ECONNABORTED') {
        setErrorMsg(error.message)
      } else {
        try {
          const msg = error.response.data
          if (msg === 'Username already exist!') {
            setErrorMsg('Nama akun telah digunakan!')
          } else if (msg === 'Email already exist!') {
            setErrorMsg('Alamat email telah digunakan!')
          }
        } catch (error) {
          setErrorMsg(
            'Server kami sedang bermasalah, coba beberapa saat lagi atau hubungi kontak kami!',
          )
        }
      }
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
          message: 'nama akun hanya huruf/angka dan tanpa spasi',
        })
        .min(4, 'nama akun minimal 4 karakter')
        .max(20, 'nama akun maksimal 20 karakter')
        .required('nama akun harus diisi'),
      email: Yup.string()
        .email('masukan email yang valid')
        .required('email harus diisi'),
      password: Yup.string()
        .min(8, 'kata sandi minimal 8 karakter')
        .max(100, 'kata sandi maksimal 100 karakter')
        .required('kata sandi harus diisi'),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    enableReinitialize: true,
    onSubmit: async (values) => {
      registerHandler(values)
    },
  })

  return (
    <div className={css.backdrop}>
      <div className={css.register__container}>
        <div className={css.left__container}>
          <div className={css.top__menu__container}>
            <img alt="logo-siab" src={logo_siab} />
            <div className={css.menu__container}>
              <a className={css.menu__daftar} href="/register">
                Daftar
              </a>
              <a className={css.menu__masuk} href="/">
                Masuk
              </a>
            </div>
          </div>
          <form
            className={css.form}
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
            noValidate
          >
            <Collapse in={isError}>
              <Alert severity="error">{errorMsg}</Alert>
            </Collapse>
            <Collapse in={isSuccess}>
              <Alert severity="success">
                Akun telah dibuat, silahkan masuk
              </Alert>
            </Collapse>
            <h1>DAFTAR</h1>
            <label>Nama Akun</label>
            <TextField
              id="username"
              name="username"
              placeholder="nama akun"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              helperText={formik.errors.username}
              error={formik.errors.username ? true : false}
            />
            <label>Email</label>
            <TextField
              id="email"
              name="email"
              placeholder="akun@gmail.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              helperText={formik.errors.email}
              error={formik.errors.email ? true : false}
            />
            <label>Kata Sandi</label>
            <TextField
              id="password"
              name="password"
              type="password"
              placeholder="kata sandi"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              helperText={formik.errors.password}
              error={formik.errors.password ? true : false}
            />

            <br />
            <button type="submit" disabled={isLoading}>
              {isLoading ? <img alt="loading" src={loading} /> : 'Daftar'}
            </button>
            <a className="cancel" href="/">
              sudah punya akun?
            </a>
          </form>
        </div>
        <div className={css.right__container}>
          <p>Your Digital Water Solution</p>
          <img alt="banner" src={banner} />
        </div>
      </div>
    </div>
  )
}

export default Register
