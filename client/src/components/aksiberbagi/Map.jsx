/* eslint-disable */
import React, { useState, useEffect } from 'react'
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api'
import axios from 'axios'

const libraries = ['places']

function Map() {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setIsLoading(true)
    setIsError(false)
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/devices`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('_s_t'),
          },
          timeout: 5000,
          timeoutErrorMessage: 'Koneksi timeout, periksa kembali koneksi anda!',
        },
      )
      if (response) {
        setIsLoading(false)
        setData(response.data)
      }
    } catch (error) {
      setIsLoading(false)
      setIsError(true)
      setErrorMsg(error.message)
    }
  }

  const [selected, setSelected] = useState(null)

  const mapContainerStyle = {
    marginTop: '10px',
    width: '100%',
    height: '300px',
    borderRadius: '25px',
    overflow: 'hidden',
  }

  const center = {
    lat: -7.560618,
    lng: 110.808655,
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API,
    libraries,
  })

  if (loadError) return 'Terjadi kesalahan saat mengunduh peta!'
  if (!isLoaded) return 'Peta sedang dimuat...'

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center}>
      {data &&
        data.map((theData, i) => {
          return (
            <Marker
              key={i}
              onClick={() => setSelected(theData)}
              position={{ lat: theData.lat, lng: theData.lng }}
            />
          )
        })}
      {selected && (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => setSelected(null)}
        >
          <div>
            <h2>{selected.name}</h2>
            <p>Total Flow: {selected.total_flow} liter</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  )
}

export default Map
