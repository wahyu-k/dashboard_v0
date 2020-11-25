import React, { useEffect } from 'react'
import LaporImg from '../landingpage/Img'

function Lapor(props) {
  useEffect(() => {
    props.onView()
  }, [props])
  return (
    <div>
      <LaporImg />
    </div>
  )
}

export default Lapor
