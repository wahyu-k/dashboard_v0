import React, { useState, useEffect } from 'react'
import Map from './aksiberbagi/Map'
import ComparationApp from './landingpage/ComparationApp'
import DistributionWidget from './landingpage/DistributionWidget'
import css from './LandingPage.module.css'

function LandingPage(props) {
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
      <Map data={data} />
      <DistributionWidget />
      <ComparationApp />
    </div>
  )
}

export default LandingPage
