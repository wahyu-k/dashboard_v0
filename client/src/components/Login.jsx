import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Login() {
  const [uoe, setUoe] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (event) => {
    event.preventDefault()
    loginHandler()
  }

  const loginHandler = async () => {
    try {
      const response = await axios.post('http://localhost:5000/v1/login', {
        uoe,
        password,
      })

      localStorage.setItem('_s_t', response.data)
      window.location.reload()
    } catch (error) {
      console.error(error.response.data)
    }
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(event) => submitHandler(event)}>
        <input
          onChange={(event) => setUoe(event.target.value)}
          placeholder="Username or Email"
          required
        />
        <input
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <Link to="/forget_password">
          <button>Forget My Password</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </form>
    </div>
  )
}

export default Login
