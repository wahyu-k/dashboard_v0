import React, { useState, useEffect } from 'react'
import axios from 'axios'

function EditDevices(props) {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const { id, name, lat, lng, user_id } = props.data
    setId(id)
    setName(name)
    setLat(lat)
    setLng(lng)
    setUserId(user_id)
  }, [props.data])

  const saveHandler = async () => {
    const data = {
      id,
      name,
      lat,
      lng,
      user_id: userId,
    }
    try {
      const response = await axios.put(
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
        <input value={name} onChange={(event) => setName(event.target.value)} />
      </td>
      <td>
        <input value={lat} onChange={(event) => setLat(event.target.value)} />
      </td>
      <td>
        <input value={lng} onChange={(event) => setLng(event.target.value)} />
      </td>
      <td>
        <input
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        />
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

export default EditDevices
