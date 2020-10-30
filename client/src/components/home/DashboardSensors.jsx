import React, { useState, useEffect } from 'react'
import axios from 'axios'

import UserBill from './UserBill'
import UserSensor from './UserSensor'
import UserGraph from './UserGraph'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Collapse, Button } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

function DashboardSensors() {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
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
    setIsLoading(true)
    setIsError(false)
    try {
      const getSens = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/users/sensors`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('_s_t'),
          },
          params: {
            time: 0,
          },
          timeout: 5000,
          timeoutErrorMessage: 'Koneksi timeout, periksa kembali koneksi anda!',
        },
      )
      if (getSens) {
        setIsLoading(false)
        setLatest(getSens.data.primary[0])
        setData(getSens.data)
      }
    } catch (error) {
      setIsLoading(false)
      setIsError(true)
      setErrorMsg(error.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const action = (
    <Button
      color="secondary"
      size="small"
      onClick={() => window.location.reload()}
    >
      Muat Ulang
    </Button>
  )

  return (
    <div>
      {isLoading && (
        <LinearProgress
          style={{
            marginRight: '-24px',
            marginLeft: '-24px',
            marginTop: '-20px',
            marginBottom: '16px',
          }}
        />
      )}

      <Collapse in={isError}>
        <div style={{ maxWidth: '100%', marginBottom: '17px' }}>
          <Alert severity="warning" action={action}>
            {errorMsg}
          </Alert>
        </div>
      </Collapse>

      <UserBill data={data} />
      <UserSensor data={latest} />
      <UserGraph data={data} />
    </div>
  )
}

export default DashboardSensors
