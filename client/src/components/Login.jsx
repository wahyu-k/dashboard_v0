import React, { useState, useEffect } from 'react'
import axios from 'axios'
import css from './login/login.module.css'
import banner from '../img/login/auth.png'
import mail_icon from '../img/login/mail_icon.png'
import pass_icon from '../img/login/pass_icon.png'
import { TextField, InputAdornment, Collapse } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import loading from '../img/loading.gif'
import { Link, } from 'react-router-dom'

function Login(props) {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    props.onView()
  }, [props])

  const formik = useFormik({
    initialValues: {
      uoe: '',
      password: '',
    },
    validationSchema: Yup.object({
      uoe: Yup.string().required('email atau username harus diisi'),
      password: Yup.string()
        .min(8, 'kata sandi lebih dari atau sama dengan 8 karakter')
        .required('kata sandi harus diisi'),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    enableReinitialize: true,
    onSubmit: async (values) => {
      submitHandler(values)
    },
  })

  const submitHandler = async (values) => {
    setIsLoading(true)
    setIsError(false)
    loginHandler(values)
  }

  const loginHandler = async ({ uoe, password }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/login`,
        {
          uoe,
          password,
        },
        {
          timeout: 5000,
          timeoutErrorMessage: 'Koneksi timeout, periksa kembali koneksi anda!',
        },
      )

      if (response) {
        localStorage.setItem('_s_t', response.data)
        window.location.replace('/')
      }
    } catch (error) {
      setIsLoading(false)
      setIsError(true)
      if (error.code === 'ECONNABORTED') {
        setErrorMsg(error.message)
      } else {
        setErrorMsg('Kombinasi email/nama akun dengan kata sandi salah!')
      }
    }
  }
  return (
    <div className={css.login__container}>
      <Collapse in={isError}>
        <Alert severity="error">{errorMsg}</Alert>
      </Collapse>
      <form
        className={css.form}
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
        noValidate
      >
        <label>Email</label>
        <TextField
          id="uoe"
          name="uoe"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.uoe}
          helperText={formik.errors.uoe}
          error={formik.errors.uoe ? true : false}
          placeholder="alamat email"
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
          id="password"
          name="password"
          type="password"
          placeholder="kata sandi"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          helperText={formik.errors.password}
          error={formik.errors.password ? true : false}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <img alt="password" src={pass_icon} />
              </InputAdornment>
            ),
          }}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? <img alt="loading" src={loading} /> : 'Masuk'}
        </button>
        <Link to="/forget_password">lupa kata sandi?</Link>
        <Link to="/register">belum punya akun?</Link>
      </form>
      <img alt="auth-img" src={banner} />
    </div>
  )
}

export default Login
