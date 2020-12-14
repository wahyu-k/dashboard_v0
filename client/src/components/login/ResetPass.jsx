import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import css from './resetPass.module.css'
import { TextField, Collapse } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useFormik } from 'formik'
import * as Yup from 'yup'

function ResetPass(props) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const { token } = useParams()
  const history = useHistory()

  useEffect(() => {
    props.onView()
  }, [props])

  const formik = useFormik({
    initialValues: {
      password: '',
      repeatPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, 'kata sandi minimal 8 karakter')
        .max(100, 'kata sandi maksimal 100 karakter')
        .required('kata sandi harus diisi'),
      repeatPassword: Yup.string()
        .min(8, 'kata sandi minimal 8 karakter')
        .max(100, 'kata sandi maksimal 100 karakter')
        .required('kata sandi harus diisi'),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    enableReinitialize: true,
    onSubmit: async (values) => {
      resetHandler(values)
    },
  })

  const resetHandler = async ({ password, repeatPassword }) => {
    if (password !== repeatPassword) {
      setIsError(true)
      setErrorMsg('Kata sandi tidak sama, cek kembali!')
      return
    }
    setIsLoading(true)
    setIsError(false)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/reset_password/`,
        {
          token,
          newPassword: password,
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
      setErrorMsg(error.message)
    }
  }

  return (
    <div className={css.reset__pass__container}>
      <Collapse in={isSuccess}>
        <Alert severity="success">
          Kata sandi Anda berhasil diperbarui, silahkan login kembali!
        </Alert>
        <br />
      </Collapse>
      <Collapse in={isError}>
        <Alert severity="error">{errorMsg}</Alert>
        <br />
      </Collapse>
      <form
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
        noValidate
      >
        <TextField
          id="password"
          label="Kata Sandi Baru"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          helperText={formik.errors.password}
          error={formik.errors.password ? true : false}
        />
        <TextField
          id="repeatPassword"
          label="Ulang Kata Sandi Baru"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.repeatPassword}
          helperText={formik.errors.repeatPassword}
          error={formik.errors.repeatPassword ? true : false}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <img
              alt="loading"
              src={
                'https://s3.us-east-2.amazonaws.com/assets.siagaairbersih.com/loading.gif'
              }
            />
          ) : (
            'Reset Kata Sandi'
          )}
        </button>
      </form>
      <img
        alt="forpass-img"
        src={
          'https://s3.us-east-2.amazonaws.com/assets.siagaairbersih.com/login/auth.png'
        }
      />
    </div>
  )
}

export default ResetPass
