import React, { useState } from 'react'

function RegisterDevice(props) {
  const [name, setName] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')

  const saveHandler = () => {
    const data = {
      name,
      lat,
      lng,
    }
    props.saveHandler(data)
  }

  const cancelHandler = () => {
    props.cancelHandler()
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
