import React, { useState, useEffect } from 'react'
// import Prosedur_Hardware from './../../docs/Prosedur_Hardware.pdf'
import Prosedur_Software from './../../docs/Prosedur_Software.pdf'
import css from './help.module.css'
import Button from '@material-ui/core/Button'

function Help(props) {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    props.onView()
  }, [props])

  return (
    <div className={css.help}>
      <p>Panduan Pembuatan Akun Baru SIAB Indonesia</p>
      <iframe
        title="video ab"
        width="644"
        height="362"
        src="https://www.youtube.com/embed/z1i3nrJmYMM"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen="1"
      ></iframe>
      <p>Panduan Penggunaan Akun Pengelola</p>
      <iframe
        title="video ac"
        width="644"
        height="362"
        src="https://www.youtube.com/embed/zje3KjcIcJE"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen="1"
      ></iframe>
      <div className={css.manualbook__container}>
        <Button variant="contained" color="primary">
          <a href={Prosedur_Software}>Download Buku Panduan</a>
        </Button>
      </div>
      <div className={css.footer}>
        <p>Copyright © 2020 SIAB Indonesia</p>
        <p>Powered by SIAB Indonesia</p>
      </div>
    </div>
  )
}

export default Help
