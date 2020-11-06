import React, { useEffect } from 'react'
import css from './help.module.css'

function Help(props) {
  useEffect(() => {
    props.onView()
  }, [props])

  return (
    <div className={css.help}>
      <div align="center">
        <iframe
          title="video ab"
          width="644"
          height="362"
          src="https://www.youtube.com/embed/MM42t36jKNs"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen="1"
        ></iframe>
      </div>
      <div className={css.footer}>
        <p>Copyright © 2020 SIAB Indonesia</p>
        <p>Powered by SIAB Indonesia</p>
      </div>
    </div>
  )
}

export default Help
