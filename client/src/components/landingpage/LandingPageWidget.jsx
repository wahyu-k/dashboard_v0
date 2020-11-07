import React from 'react'
import css from './LandingPageWidget.module.css'

function LandingPageWidget(props) {
  return (
    <div className={css.boks}>
      {props.srcImg && <img alt="img" src={props.srcImg} />}

      <div className={css.blueboks}>
        <p className={css.nominal}>{props.nominal}</p>
        <p className={css.text}>{props.text}</p>
      </div>
    </div>
  )
}

export default LandingPageWidget
