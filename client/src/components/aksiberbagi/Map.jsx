import React, { useState } from 'react'
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api'

function Map({ data }) {
  const [selected, setSelected] = useState(null)

  const mapContainerStyle = {
    width: '100%',
    height: '50vh',
    borderRadius: '25px',
    overflow: 'hidden',
  }

  const center = {
    lat: 12.12,
    lng: 13.13,
  }

  const libraries = ['places']

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API,
    libraries,
  })

  if (loadError) return 'Error'
  if (!isLoaded) return 'Loading...'

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center}>
      {data.map((theData, i) => {
        return (
          <Marker
            key={i}
            onClick={() => setSelected(theData)}
            position={{ lat: theData.lat, lng: theData.lng }}
          />
        )
      })}
      {selected ? (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => setSelected(null)}
        >
          <div>
            <h2>{selected.name}</h2>
            <p>Total Flow: {selected.total_flow} liter</p>
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  )
}

export default Map
