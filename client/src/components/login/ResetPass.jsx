import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

function ResetPass() {
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useParams()
  const history = useHistory()

  const submitHandler = (event) => {
    setIsLoading(true)
    event.preventDefault()
    resetHandler()
  }

  const resetHandler = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/v1/reset_password/',
        {
          token,
          newPassword: password,
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

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={(event) => submitHandler(event)}>
        <input
          placeholder="New Password"
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          Reset Password
        </button>
      </form>
    </div>
  )
}

export default ResetPass