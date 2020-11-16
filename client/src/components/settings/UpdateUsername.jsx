import React, { useState } from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import Button from '@material-ui/core/Button'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import css from './UpdateUsername.module.css'
import { Collapse, CircularProgress } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useHistory } from 'react-router-dom'

function UpdateUsername() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const history = useHistory()

  const updateHandler = async ({ newUoe, currPass }) => {
    setIsLoading(true)
    setIsError(false)

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/update_username`,
        { newUsername: newUoe, password: currPass },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('_s_t'),
          },
          timeout: 5000,
          timeoutErrorMessage: 'Koneksi timeout, periksa kembali koneksi anda!',
        },
      )

      if (response) {
        setIsLoading(false)
        setIsSuccess(true)
        setTimeout(() => {
          history.push('/logout')
        }, 3000)
      }
    } catch (error) {
      setIsLoading(false)
      setIsError(true)
      try {
        const msg = error.response.data
        if (msg === 'Username already exist!') {
          setErrorMsg('Nama akun telah digunakan!')
        } else if (msg === 'Check your password again!') {
          setErrorMsg('Cek lagi kata sandi Anda!')
        }
      } catch (error) {
        setErrorMsg(
          'Server kami sedang bermasalah, coba beberapa saat lagi atau hubungi kontak kami!',
        )
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      newUoe: '',
      currPass: '',
    },
    validationSchema: Yup.object({
      newUoe: Yup.string().required('email atau username harus diisi'),
      currPass: Yup.string()
        .min(8, 'kata sandi lebih dari atau sama dengan 8 karakter')
        .required('kata sandi harus diisi'),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    enableReinitialize: true,
    onSubmit: async (values) => {
      updateHandler(values)
    },
  })

  return (
    <div className={css.update__username__container}>
      <h3>Perbarui Username</h3>
      <div className={css.line}></div>
      <Collapse in={isError}>
        <Alert severity="error">{errorMsg}</Alert>
      </Collapse>
      <Collapse in={isSuccess}>
        <Alert severity="success">
          Username-mu behasil diperbaharui! <p /> Silahkan login kembali!
        </Alert>
      </Collapse>
      <form
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
        noValidate
      >
        <div className={css.form__container}>
          <div className={css.input}>
            <TextField
              style={{
                width: '100%',
              }}
              id="newUoe"
              label="Username Baru"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newUoe}
              helperText={formik.errors.newUoe}
              error={formik.errors.newUoe ? true : false}
            />
          </div>
          <div className={css.input}>
            <TextField
              style={{
                width: '100%',
              }}
              id="currPass"
              type="password"
              label="Kata Sandi"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.currPass}
              helperText={formik.errors.currPass}
              error={formik.errors.currPass ? true : false}
            />
          </div>
          <div align="center">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              startIcon={
                isLoading ? (
                  <CircularProgress size="24px" />
                ) : (
                  <AccountBoxIcon />
                )
              }
              disabled={isLoading}
            >
              Perbarui Username
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UpdateUsername
