import React, { useState } from 'react'
import axios from 'axios'

function UpdateUsername() {
  const [newUname, setNewUname] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (event) => {
    event.preventDefault()
    updateHandler()
  }

  const updateHandler = async () => {
    const token = localStorage.getItem('_s_t')
    const data = {
      token,
      newUsername: newUname,
      password,
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

  return (
    <div>
      <h2>Update Username</h2>
      <form onSubmit={(event) => submitHandler(event)}>
        <input
          placeholder="New Username"
          onChange={(event) => setNewUname(event.target.value)}
        />
        <input
          placeholder="Confirm Your Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Update Username</button>
      </form>
    </div>
  )
}

export default UpdateUsername
