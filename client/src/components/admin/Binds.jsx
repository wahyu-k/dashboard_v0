import React, { useState } from 'react'
import axios from 'axios'

function Binds() {
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState(0)
  const [deviceId, setDeviceId] = useState('')

  const bind = async () => {
    setIsLoading(true)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/binds`,
        { user_id: userId, device_id: JSON.parse('[' + deviceId + ']') },
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
      <h2>Binds Users with Devices</h2>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        value={deviceId}
        onChange={(e) => setDeviceId(e.target.value)}
      />
      <button onClick={() => bind()} disabled={isLoading}>
        Bind
      </button>
    </div>
  )
}

export default Binds
