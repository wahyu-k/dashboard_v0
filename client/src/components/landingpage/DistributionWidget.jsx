import React from 'react'
import crude from '../../img/crude.png'
import handwash from './../../img/handwash.png'
import like from './../../img/like.png'
import settings from './../../img/settings.png'
import wrench from './../../img/wrench.png'
import LandingPageWidget from './LandingPageWidget'
import css from './DistributionWidget.module.css'

function DistributionWidget() {
  return (
    <div className={css.allboks}>
      <div className={css.boks}>
        <LandingPageWidget
          text="Alat Terpasang"
          nominal="4"
          srcImg={handwash}
        />
      </div>
      <div className={css.boks}>
        <LandingPageWidget
          text="Total Liter Air SIAB"
          nominal="29389"
          srcImg={crude}
        />
      </div>
      <div className={css.boks}>
        <LandingPageWidget
          text="Total KK Pengguna SIAB"
          nominal="1816"
          srcImg={like}
        />
      </div>
      <div className={css.boks}>
        <LandingPageWidget
          text="Alat Beroperasi"
          nominal="100%"
          srcImg={settings}
        />
      </div>
      <div className={css.boks}>
        <LandingPageWidget
          text="Dalam Pemeliharaan"
          nominal="0"
          srcImg={wrench}
        />
      </div>
    </div>
  )
}

export default DistributionWidget
