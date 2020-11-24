import React, { useEffect } from 'react'
import Map from './aksiberbagi/Map'
import ComparationApp from './landingpage/ComparationApp'
import DistributionWidget from './landingpage/DistributionWidget'
import Lapor from './landingpage/Lapor'
// import Uploadtest from './landingpage/Uploadtest'
// import Khelifupload from './landingpage/Khelifupload'
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
      <Lapor />
      {/* <Uploadtest /> */}
      {/* <Khelifupload /> */}
      {/* <div className={css.footer}>
        <p>Copyright © 2020 SIAB Indonesia</p>
        <p>Powered by SIAB Indonesia</p>
      </div> */}
    </div>
  )
}

export default LandingPage
