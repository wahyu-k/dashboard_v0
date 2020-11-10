import React, { useState, useEffect } from 'react'
import axios from 'axios'

import UserBill from './UserBill'
import UserSensor from './UserSensor'
import UserGraph from './UserGraph'
import Lapor from './Lapor'

function DashboardSensors() {
  const [latest, setLatest] = useState({
    ph: 0,
    tds: 0,
    turb: 0,
    temp: 0,
    flow: 0,
    device_id: 0,
    created_at: 0,
  })
  const [data, setData] = useState(null)

  async function fetchData() {
    const getSens = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/v1/users/sensors`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('_s_t'),
        },
        params: {
          time: 0,
        },
      },
    )
    setLatest(getSens.data.primary[0])
    setData(getSens.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <UserBill data={data} />
      <UserSensor data={latest} />
      <UserGraph data={data} />
      <Lapor />
    </div>
  )
}

export default DashboardSensors
