import React, { useEffect } from 'react'
// import Prosedur_Hardware from './../../docs/Prosedur_Hardware.pdf'
import Prosedur_Software from './../../docs/Prosedur_Software.pdf'
import css from './help.module.css'
import Button from '@material-ui/core/Button'

function Help(props) {
  // const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    props.onView()
  }, [props])

  return (
    <div className={css.help}>
      <div className={css.grid__container}>
        <div className={css.vid__container}>
          <p>Panduan Pembuatan Akun Baru</p>
          <iframe
            title="daftar"
            width="426"
            height="240"
            src="https://www.youtube.com/embed/z1i3nrJmYMM"
            // frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen="1"
          ></iframe>
        </div>
        <div className={css.vid__container}>
          {/*<div className={css.grid__container}> */}
          <p>Panduan Login Akun</p>
          <iframe
            title="login"
            width="426"
            height="240"
            src="https://www.youtube.com/embed/2MasJ-8xf2Q"
            // frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen="1"
          ></iframe>
        </div>
        <div className={css.vid__container}>
          {/* <div className={css.grid__container}> */}
          <p>Panduan Penggunaan Akun Premium</p>
          <iframe
            title="premium"
            width="426"
            height="240"
            src="https://www.youtube.com/embed/ghDOH8ejWu4"
            // frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen="1"
          ></iframe>
        </div>
        <div className={css.vid__container}>
          {/*<div className={css.grid__container}> */}
          <p>Panduan Penggunaan Akun Pengelola</p>
          <iframe
            title="pengelola"
            width="426"
            height="240"
            src="https://www.youtube.com/embed/zje3KjcIcJE"
            // frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen="1"
          ></iframe>
        </div>
      </div>
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
