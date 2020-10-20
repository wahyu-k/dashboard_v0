import React, { useEffect } from 'react'
import ComparationApp from './home/ComparationApp'

function LandingPage(props) {
  useEffect(() => {
    props.onView()
  }, [props])

  return (
    <div>
      <ComparationApp />
    </div>
  )
}

export default LandingPage
