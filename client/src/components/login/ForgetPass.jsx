import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

function ForgetPass() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()

  const submitHandler = (event) => {
    setIsLoading(true)
    event.preventDefault()
    sendResetPass()
  }

  const sendResetPass = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/v1/forget_password',
        {
          receiver: email,
        },
      )

      if (response) {
        alert("We've send you an email to reset your password...")
        history.push('/')
      }
    } catch (error) {
      setIsLoading(false)
      console.error(error.response.data)
    }
  }

  return (
    <div>
      <h1>Forget Password</h1>
      <form onSubmit={(event) => submitHandler(event)}>
        <input
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          Send Reset Password Link
        </button>
      </form>
    </div>
  )
}

export default ForgetPass
