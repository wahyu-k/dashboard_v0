import React, { useEffect } from 'react'
// import css from './help.module.css'

function Help(props) {
  useEffect(() => {
    props.onView()
  }, [props])

  return (
    <div align="center">
      <iframe
        title="video ab"
        width="644"
        height="362"
        src="https://www.youtube.com/embed/GPvtUL-AcAA"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen="1"
      ></iframe>
    </div>
  )
}

export default Help
