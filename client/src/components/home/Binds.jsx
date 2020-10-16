import React, { useState } from 'react'
import axios from 'axios'
import epochToDate from '../../helper/epochToDate'

function Binds() {
  const [devices, setDevices] = useState([])
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
        setDevices(response.data)
      }
    } catch (error) {
      setIsLoading(false)
      console.error(error.response.data)
    }
  }

  // const addiddevid = async (a) => {
  //   if (a === 'addid') {
  //     setAddid(addid + 1)
  //   }
  // }
  // console.log('addid', addid)

  //   try {
  //     const resp = await axios.post(
  //       `${process.env.REACT_APP_BASE_URL}/v1/binds`,
  //       { user_id: userId, device_id: deviceId },
  //     )
  //     if (response) {
  //       setIsLoading(false)
  //       setDevices(response.data)
  //     }
  //   } catch (error) {
  //     setIsLoading(false)
  //     console.error(error.response.data)
  //   }
  // }
  // const userId = userId
  // const dev_id = dev_id
  // const getUsersHandler = async () => {
  //   setIsLoading(true)
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_BASE_URL}/v1/admin/logins`,
  //     )
  //     if (response) {
  //       setIsLoading(false)
  //       setUsers(response.data)
  //     }
  //   } catch (error) {
  //     setIsLoading(false)
  //     console.error(error.response.data)
  //   }
  // }

  return (
    <div>
      <h2>Binds Users with Devices</h2>
      <table>
        <h3>Binding List</h3>
        <tbody>
          <tr>
            <th>User Id</th>
            <th>Device Id</th>
          </tr>
          <tr>
            <th></th>
            <th></th>
          </tr>
          {/* <tr>
            <th>Id</th>
            <th>Device Id</th>
            <th>pH</th>
            <th>TDS</th>
            <th>Turbidity</th>
            <th>Temperature</th>
            <th>Flow</th>
            <th>Created At</th>
          </tr>
          {devices
          .map((theSensor, i) => (
            <tr key={i}>
              <td>{theSensor.id}</td>
              <td>{theSensor.deviceId}</td>
              <td>{theSensor.ph}</td>
              <td>{theSensor.tds}</td>
              <td>{theSensor.turb}</td>
              <td>{theSensor.temp}</td>
              <td>{theSensor.flow}</td>
              <td>{epochToDate(theSensor.created_at)}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
      {/* <form>
          <label for="cars">Choose a car:</label>
          <select name="cars" id="cars">
            <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
              </select>
              
            </form> */}
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
      {/* for (const addid = 1; addid = addid+1; addid++)
      {addid.forEach((addid) => {
        ;<div>
          <input
            type="text"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
          />
        </div>
      })} */}
      {/* <button onClick={() => addiddevid('addid')} disabled={isLoading}>
        +
      </button> */}
      <button onClick={() => bind()} disabled={isLoading}>
        Bind
      </button>
    </div>
  )
}

export default Binds
