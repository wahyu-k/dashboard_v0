import React, { useState, useEffect } from 'react'
import Map from './aksiberbagi/Map'
import ComparationApp from './landingpage/ComparationApp'
import DistributionWidget from './landingpage/DistributionWidget'
import css from './LandingPage.module.css'

function FreeUser(props) {
  //eslint-disable-next-line
  const [data, setData] = useState([
    {
      name: 'Loading...',
      lat: 0,
      lng: 0,
      total_flow: 0,
    },
  ])

  useEffect(() => {
    props.onView()
  }, [props])

  return (
    <div className={css.landing__container}>
      <div className={css.maps__container}>
        <h3>Lokasi Implementasi SIAB</h3>
        <div className={css.line}></div>
        <Map data={data} />
      </div>
      <DistributionWidget />
      <ComparationApp />
      <div className={css.footer}>
        <p>Copyright © 2020 SIAB Indonesia</p>
        <p>Powered by SIAB Indonesia</p>
      </div>
    </div>
  )
}

export default FreeUser
