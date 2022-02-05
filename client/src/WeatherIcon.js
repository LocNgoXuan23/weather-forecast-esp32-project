import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import icon1 from './images/icons/icon-1.svg'
import icon2 from './images/icons/icon-2.svg'
import icon3 from './images/icons/icon-3.svg'
import icon4 from './images/icons/icon-4.svg'
import icon5 from './images/icons/icon-5.svg'
import icon6 from './images/icons/icon-6.svg'
import icon7 from './images/icons/icon-7.svg'
import icon8 from './images/icons/icon-8.svg'
import icon9 from './images/icons/icon-9.svg'
import icon10 from './images/icons/icon-10.svg'
import icon11 from './images/icons/icon-11.svg'
import icon12 from './images/icons/icon-12.svg'
import icon13 from './images/icons/icon-13.svg'
import icon14 from './images/icons/icon-14.svg'

import { getMainWeatherIcon } from './utils/helpers'

const WeatherIcon = ({ humidity, width }) => {
  const [iconsList, setIconsList] = useState([icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8, icon9, icon10, icon11, icon12, icon13, icon14])
  const [mainIcon, setMainIcon] = useState(null)

  useEffect(() => {
    setMainIcon(getMainWeatherIcon(humidity))
  }, [humidity])

  return <img src={iconsList[mainIcon]} alt="" width={width}/>
}


export default WeatherIcon
