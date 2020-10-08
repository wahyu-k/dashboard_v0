import React, { useState } from 'react'
import axios from 'axios'

function RegisterDevice(props) {
  const [name, setName] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [userId, setUserId] = useState('')

  const saveHandler = async () => {
    props.onStart()
    const data = {
      name,
      lat,
      lng,
      user_id: userId,
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/devices`,
        data,
      )

      if (response) {
        props.onFinish()
      }
    } catch (error) {
      console.error(error.response.data)
    }
  }

  const cancelHandler = () => {
    props.onCancel()
  }

  return (
    <tr>
      <td>
        <p>-</p>
      </td>
      <td>
        <input onChange={(event) => setName(event.target.value)} />
      </td>
      <td>
        <input onChange={(event) => setLat(event.target.value)} />
      </td>
      <td>
        <input onChange={(event) => setLng(event.target.value)} />
      </td>
      <td>
        <input onChange={(event) => setUserId(event.target.value)} />
      </td>
      <td>
        <button onClick={() => saveHandler()} disabled={props.isLoading}>
          Save
        </button>
        <button onClick={() => cancelHandler()} disabled={props.isLoading}>
          Cancel
        </button>
      </td>
    </tr>
  )
}

export default RegisterDevice
