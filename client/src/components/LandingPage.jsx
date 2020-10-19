import React, { useEffect } from 'react'

function LandingPage(props) {
  useEffect(() => {
    props.onView()
  }, [props])

  return <div>Landing Page</div>
}

export default LandingPage
