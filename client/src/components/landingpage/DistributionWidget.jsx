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
      <LandingPageWidget text="Alat Terpasang" nominal="51" srcImg={handwash} />
      <LandingPageWidget
        text="Total Liter Air SIAB"
        nominal="26,823"
        srcImg={crude}
      />
      <LandingPageWidget
        text="Total KK Pengguna SIAB"
        nominal="50"
        srcImg={like}
      />
      <LandingPageWidget
        text="Alat Beroperasi"
        nominal="100%"
        srcImg={settings}
      />
      <LandingPageWidget
        text="Dalam Pemeliharaan"
        nominal="0"
        srcImg={wrench}
      />
    </div>
  )
}

export default DistributionWidget
