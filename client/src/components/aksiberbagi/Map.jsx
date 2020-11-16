/* eslint-disable */
import React, { useState, useEffect } from 'react'
import {
  GoogleMap,
  InfoWindow,
  // Marker,
  useLoadScript,
} from '@react-google-maps/api'
import axios from 'axios'
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl'
import siab_logo from '../../img/siab_logo.png'

const libraries = ['places']

function Map() {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [data, setData] = useState(null)
  const [loc, setLoc] = useState({
    longitude: 110.808655,
    latitude: -7.560618,
    zoom: 12,
  })

  useEffect(() => {
    fetchData()
  }, [])

  const procCenter = (x) => {
    let lat = 0
    let lng = 0

    x &&
      x.forEach((element) => {
        lat += parseFloat(element.lat)
        lng += parseFloat(element.lng)
      })

    lat = lat / x.length
    lng = lng / x.length

    setLoc({
      latitude: lat,
      longitude: lng,
      zoom: 12,
    })
  }

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
        procCenter(response.data)
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

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API,
    libraries,
  })

  if (loadError) return 'Terjadi kesalahan saat mengunduh peta!'
  if (!isLoaded) return 'Peta sedang dimuat...'

  return (
    <ReactMapGL
      {...loc}
      width="100%"
      height="300px"
      mapboxApiAccessToken="pk.eyJ1Ijoic2lhYiIsImEiOiJja2ZwZ3BsbGgwN2RsMnBwZ2ExMHE0bDJiIn0.ob5RauYOHOSGeNiGH38OWg"
      onViewportChange={(vp) => {
        setLoc(vp)
      }}
      mapStyle="mapbox://styles/siab/ckhao7qro0t5f19tbk9xctd3j"
    >
      <div style={{ position: 'absolute', right: 0 }}>
        <NavigationControl />
      </div>
      {data &&
        data.map((theData, i) => {
          return (
            <Marker
              latitude={theData.lat}
              longitude={theData.lng}
              offsetLeft={0}
              offsetTop={0}
              key={i}
            >
              <img
                src={siab_logo}
                alt="siab_logo"
                style={{
                  width: '20px',
                }}
              />
            </Marker>
          )
        })}
    </ReactMapGL>
    // <GoogleMap mapContainerStyle={mapContainerStyle} zoom={13} center={center}>
    //   {data &&
    //     data.map((theData, i) => {
    //       return (
    //         <Marker
    //           key={i}
    //           onClick={() => setSelected(theData)}
    //           position={{ lat: theData.lat, lng: theData.lng }}
    //         />
    //       )
    //     })}
    //   {selected && (
    //     <InfoWindow
    //       position={{ lat: selected.lat, lng: selected.lng }}
    //       onCloseClick={() => setSelected(null)}
    //     >
    //       <div>
    //         <h2>{selected.name}</h2>
    //         {/* <p>Total Flow: {selected.total_flow} liter</p> */}
    //       </div>
    //     </InfoWindow>
    //   )}
    // </GoogleMap>
  )
}

export default Map
