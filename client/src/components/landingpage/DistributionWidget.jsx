import React from 'react'
import LandingPageWidget from './LandingPageWidget'
import css from './DistributionWidget.module.css'

function DistributionWidget() {
  return (
    <div className={css.allboks}>
      <LandingPageWidget
        text="Alat Terpasang"
        nominal="51"
        srcImg={
          'https://s3.us-east-2.amazonaws.com/assets.siagaairbersih.com/handwash.png'
        }
      />
      <LandingPageWidget
        text="Total Liter Air SIAB"
        nominal="26,823"
        srcImg={
          'https://s3.us-east-2.amazonaws.com/assets.siagaairbersih.com/crude.png'
        }
      />
      <LandingPageWidget
        text="Total KK Pengguna SIAB"
        nominal="50"
        srcImg={
          'https://s3.us-east-2.amazonaws.com/assets.siagaairbersih.com/like.png'
        }
      />
      <LandingPageWidget
        text="Alat Beroperasi"
        nominal="100%"
        srcImg={
          'https://s3.us-east-2.amazonaws.com/assets.siagaairbersih.com/settings.png'
        }
      />
      <LandingPageWidget
        text="Dalam Pemeliharaan"
        nominal="0"
        srcImg={
          'https://s3.us-east-2.amazonaws.com/assets.siagaairbersih.com/wrench.png'
        }
      />
    </div>
  )
}

export default DistributionWidget
