import React, { useEffect, useState } from 'react'
import axios from 'axios'

function UpdateBinds(props) {
  const [userId, setUserId] = useState('')
  const [primDevId, setPrimDevId] = useState('')
  const [deviceId, setDeviceId] = useState('')

  useEffect(() => {
    const { user_id, primary_dev_id, device_id } = props.data
    setUserId(user_id)
    setPrimDevId(primary_dev_id)
    setDeviceId(device_id)
  }, [props.data])

  const updateData = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/v1/binds`,
        { user_id: userId, primary_dev_id: primDevId, device_id: deviceId },
      )

      if (response) {
        props.onSuccess()
      }
    } catch (error) {
      props.onError(error)
    }
  }

  const deleteData = async () => {
    try {
      //TODO: WAITING AXIOS TO FIX DELETE METHOD PASSING BODY
      const response = await axios.request({
        method: 'delete',
        url: `${process.env.REACT_APP_BASE_URL}/v1/binds`,
        data: {
          user_id: userId,
        },
      })

      console.log(response)
      if (response) {
        props.onSuccess()
      }
    } catch (error) {
      props.onError()
    }
  }

  return (
    <tr>
      <td>{userId}</td>
      <td>
        <input
          value={primDevId}
          onChange={(e) => setPrimDevId(e.target.value)}
        />
      </td>
      <td>
        <input value={deviceId} onChange={(e) => setDeviceId(e.target.value)} />
      </td>
      <td>
        <button onClick={() => updateData()}>Save</button>
        <button onClick={() => deleteData()}>Delete</button>
        <button onClick={() => props.onCancel()}>Cancel</button>
      </td>
    </tr>
  )
}

export default UpdateBinds
