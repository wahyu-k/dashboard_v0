import React, { useState } from 'react'
import axios from 'axios'

function ForgetPass() {
  const [email, setEmail] = useState('')

  const submitHandler = (event) => {
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

      console.log(response.data)
    } catch (error) {
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
        <button type="submit">Send Reset Password Link</button>
      </form>
    </div>
  )
}

export default ForgetPass
