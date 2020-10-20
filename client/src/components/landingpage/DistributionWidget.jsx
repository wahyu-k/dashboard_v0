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
          text="Water Supply Working"
          nominal="259"
          srcImg={handwash}
        />
      </div>
      <div className={css.boks}>
        <LandingPageWidget
          text="Total Litre Dispensed"
          nominal="29389"
          srcImg={crude}
        />
      </div>
      <div className={css.boks}>
        <LandingPageWidget
          text="Total People Served"
          nominal="1816"
          srcImg={like}
        />
      </div>
      <div className={css.boks}>
        <LandingPageWidget
          text="Dispensed Working"
          nominal="96%"
          srcImg={settings}
        />
      </div>
      <div className={css.boks}>
        <LandingPageWidget
          text="Dispensers in Service"
          nominal="1293"
          srcImg={wrench}
        />
      </div>
    </div>
  )
}

export default DistributionWidget
