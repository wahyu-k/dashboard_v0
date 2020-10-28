import React, { useState } from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import css from './UpdateUsername.module.css'

function UpdateUsername() {
  const [newUname, setNewUname] = useState('')
  const [currPass, setcurrPass] = useState('')

  const submitHandler = (event) => {
    event.preventDefault()
    updateHandler()
  }
  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }))

  const classes = useStyles()

  const updateHandler = async ({ newUoe, currPass }) => {
    const token = localStorage.getItem('_s_t')
    const data = {
      token,
      newUsername: newUoe,
      currPass,
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/update_username`,
        data,
      )

      if (response) {
        console.log(response.data)
      }
    } catch (error) {
      console.error(error.response.data)
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
      <h3>Update Username</h3>
      <div className={css.line}></div>
      {/* <form onSubmit={(event) => submitHandler(event)}> */}
      <form
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
        noValidate
      >
        <div className={css.form__container}>
          <div className={css.input}>
            <TextField
              style={{
                width: '95%',
              }}
              id="newUoe"
              label="New Username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newUoe}
              helperText={formik.errors.newUoe}
              error={formik.errors.newUoe ? true : false}
              placeholder="New Username"
              // InputProps={{
              //   endAdornment: (
              //     <InputAdornment position="end">
              //       <img alt="mail" src={mail_icon} />
              //     </InputAdornment>
              //   ),
              // }}
            />
          </div>
          <div className={css.input}>
            {/* <input
          className={css.input}
          placeholder="New Username"
          onChange={(event) => setNewUname(event.target.value)}
        /> */}
            {/* </div>
        <div className={css.form__container}> */}
            <TextField
              style={{
                width: '95%',
              }}
              id="currPass"
              type="password"
              label="Password"
              placeholder="kata sandi"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.currPass}
              helperText={formik.errors.currPass}
              error={formik.errors.currPass ? true : false}
              // InputProps={{
              //   endAdornment: (
              //     <InputAdornment position="end">
              //       <img alt="currPass" src={pass_icon} />
              //     </InputAdornment>
              //   ),
              // }}
            />
          </div>
          {/* <input
          className={css.input}
          placeholder="Confirm Your currPass"
          onChange={(event) => setcurrPass(event.target.value)}
        /> */}
          <div align="center">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<AccountBoxIcon />}
            >
              Update Username
            </Button>
            {/* <button className={css.button} type="submit">
              Update Username
            </button> */}
          </div>
        </div>
      </form>
    </div>
  )
}

export default UpdateUsername
