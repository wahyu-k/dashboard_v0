import React, { useEffect } from 'react'
import Map from './aksiberbagi/Map'
import ComparationApp from './landingpage/ComparationApp'
import DistributionWidget from './landingpage/DistributionWidget'
import css from './LandingPage.module.css'

function LandingPage(props) {
  //eslint-disable-next-line

  useEffect(() => {
    props.onView()
  }, [props])

  return (
    <div className={css.landing__container}>
      <div className={css.maps__container}>
        <h3>Lokasi Implementasi SIAB</h3>
        <div className={css.line}></div>
        <Map />
      </div>
      <DistributionWidget />
      <ComparationApp />
    </div>
  )
}

export default LandingPage
