import React from 'react'
import axios from 'axios'
import { useState } from 'react'

function UpdatePassword() {
  const [currentPass, setCurrentPass] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const updatePasswordHandler = async (event) => {
    setIsLoading(true)
    event.preventDefault()

    const token = localStorage.getItem('_s_t')

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/update_password`,
        {
          token,
          currentPass,
          newPassword,
        },
      )

      if (response) {
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      console.error(error.response.data)
    }
  }

  return (
    <div>
      <h2>Update Password</h2>
      <form onSubmit={(event) => updatePasswordHandler(event)}>
        <input
          placeholder="Current Password"
          onChange={(event) => setCurrentPass(event.target.value)}
        />
        <input
          placeholder="New Password"
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          Update Password
        </button>
      </form>
    </div>
  )
}

export default UpdatePassword
