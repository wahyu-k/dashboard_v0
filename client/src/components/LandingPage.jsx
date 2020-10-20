import React, { useEffect } from 'react'
import ComparationApp from './landingpage/ComparationApp'
import DistributionWidget from './landingpage/DistributionWidget'
import css from './LandingPage.module.css'

function LandingPage(props) {
  useEffect(() => {
    props.onView()
  }, [props])

  return (
    <div className={css.landing__container}>
      <DistributionWidget />
      <ComparationApp />
    </div>
  )
}

export default LandingPage
