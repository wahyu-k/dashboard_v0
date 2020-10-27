import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import css from './UpdatePassword.module.css'
import TextField from '@material-ui/core/TextField'
import * as Yup from 'yup'
import { useFormik } from 'formik'

function UpdatePassword() {
  const [isLoading, setIsLoading] = useState(false)

  const updatePasswordHandler = async ({ currentPass, newPass }) => {
    setIsLoading(true)

    const token = localStorage.getItem('_s_t')

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/update_password`,
        {
          token,
          currentPass,
          newPassword: newPass,
        },
      )

      if (response) {
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      // console.error(error.response.data)
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
    <div className={css.update_password_container}>
      <h3>Update Password</h3>
      <div className={css.line}></div>
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
            label="Masukan Password Lama"
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
            label="Masukan Password Lama"
            helperText={formik.errors.newPass}
            error={formik.errors.newPass ? true : false}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPass}
          />
        </div>
        <button className={css.button} type="submit" disabled={isLoading}>
          Update Password
        </button>
      </form>
    </div>
  )
}

export default UpdatePassword
