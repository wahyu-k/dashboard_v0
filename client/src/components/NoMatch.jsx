import React, { useEffect } from 'react'

function NoMatch(props) {
  useEffect(() => {
    props.onView()
  }, [props])

  return (
    <div>
      <h1>404</h1>
      <p>Maaf, halaman yang saat ini Anda tuju belum tersedia.</p>
      <p>Cobalah beberapa saat lagi!</p>
    </div>
  )
}

export default NoMatch
