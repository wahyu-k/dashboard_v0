import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import css from './UpdatePassword.module.css'
import TextField from '@material-ui/core/TextField'
import * as Yup from 'yup'
import Button from '@material-ui/core/Button'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import { useFormik } from 'formik'
import { Collapse, CircularProgress } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useHistory } from 'react-router-dom'

function UpdatePassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const history = useHistory()

  const updatePasswordHandler = async ({ currentPass, newPass }) => {
    setIsLoading(true)
    setIsError(false)

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/update_password`,
        {
          currentPass,
          newPassword: newPass,
        },
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
        if (msg === 'Wrong current password!') {
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
      currentPass: '',
      newPass: '',
    },
    validationSchema: Yup.object({
      currentPass: Yup.string()
        .min(8, 'kata sandi lebih dari atau sama dengan 8 karakter')
        .required('kata sandi harus diisi'),
      newPass: Yup.string()
        .min(8, 'kata sandi lebih dari atau sama dengan 8 karakter')
        .required('kata sandi harus diisi'),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    enableReinitialize: true,
    onSubmit: async (values) => {
      updatePasswordHandler(values)
    },
  })

  return (
    <div className={css.update__password__container}>
      <h3>Perbarui Kata Sandi</h3>
      <div className={css.line}></div>
      <Collapse in={isError}>
        <Alert severity="error">{errorMsg}</Alert>
      </Collapse>
      <Collapse in={isSuccess}>
        <Alert severity="success">
          Kata sandimu behasil diperbaharui! <p /> Silahkan login kembali!
        </Alert>
      </Collapse>
      <form
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
        noValidate
      >
        <div className={css.current__pass__container}>
          <TextField
            style={{
              width: '100%',
            }}
            id="currentPass"
            type="password"
            label="Masukan Kata Sandi Lama"
            helperText={formik.errors.currentPass}
            error={formik.errors.currentPass ? true : false}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.currentPass}
          />
        </div>

        <div className={css.current__pass__container}>
          <TextField
            style={{
              width: '100%',
            }}
            id="newPass"
            label="Masukan Kata Sandi Baru"
            type="password"
            helperText={formik.errors.newPass}
            error={formik.errors.newPass ? true : false}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPass}
          />
        </div>
        <div align="center">
          <Button
            variant="contained"
            color="primary"
            startIcon={
              isLoading ? <CircularProgress size="24px" /> : <VpnKeyIcon />
            }
            type="submit"
            disabled={isLoading}
          >
            Perbarui Kata Sandi
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UpdatePassword
