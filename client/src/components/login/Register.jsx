import React, { useState } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

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
    <div>
      <h1>Register</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          required
        />
        <input
          id="email"
          name="email"
          type="text"
          placeholder="E-mail"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          required
        />
        <input
          id="password"
          name="password"
          type="text"
          placeholder="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          required
        />

        <button type="submit" disabled={isLoading}>
          Register
        </button>
        <Link to="/">
          <button>Cancel</button>
        </Link>
      </form>
    </div>
  )
}

export default Register
