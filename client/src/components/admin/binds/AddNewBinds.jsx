import React, { useState } from 'react'
import axios from 'axios'

function AddNewBinds(props) {
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState('')
  const [deviceId, setDeviceId] = useState('')

  const saveData = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/binds`,
        { user_id: userId, device_id: deviceId },
      )
      if (response) {
        setIsLoading(false)
        props.onSuccess()
      }
    } catch (error) {
      setIsLoading(false)
      props.onError()
    }
  }

  return (
    <tr>
      <th>
        <input value={userId} onChange={(e) => setUserId(e.target.value)} />
      </th>
      <th>
        <input value={deviceId} onChange={(e) => setDeviceId(e.target.value)} />
      </th>
      <th>
        <button onClick={() => saveData()} disabled={isLoading}>
          Save
        </button>
        <button onClick={() => props.onCancel()}>Cancel</button>
      </th>
    </tr>
  )
}

export default AddNewBinds
