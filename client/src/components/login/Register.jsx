import React, { useState } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()

  const sumbitHandler = (event) => {
    setIsLoading(true)
    event.preventDefault()
    registerHandler()
  }

  const registerHandler = async () => {
    try {
      const response = await axios.post('http://localhost:5000/v1/register', {
        username,
        email,
        password,
      })

      if (response) {
        history.push('/')
      }
    } catch (error) {
      setIsLoading(false)
      console.error(error.response.data)
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={(event) => sumbitHandler(event)}>
        <input
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <input
          placeholder="E-mail"
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
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
