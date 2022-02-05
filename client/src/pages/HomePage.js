import React, { useState } from 'react'
import styled from 'styled-components'
import { FaBars, FaPercent } from 'react-icons/fa';
import { WiHumidity, WiDegrees } from 'react-icons/wi';

import logo from '../images/logo.png'
import iconCompass from '../images/icon-compass.png'
import iconUmberalla from '../images/icon-umberella.png'
import iconWind from '../images/icon-wind.png'


import WeatherIcon from '../WeatherIcon'
import { useWeatherContext } from '../weather_context'

const HomePage = () => {
  const { timeArray, dateArray, currentTime } = useWeatherContext()

  if (!timeArray || !dateArray || !currentTime) {
    return <div>Loading...</div>
  }

  return (
    <div className="site-content">
      <div className="site-header">
				<div className="container">
					<a href="index.html" className="branding">
						<img src={logo} alt="" className="logo"/>
						<div className="logo-type">
							<h1 className="site-title">LAL WEATHER FORECAST</h1>
							<small className="site-description">Esp32</small>
						</div>
					</a>
					<div className="main-navigation">
						<button type="button" className="menu-toggle"><i><FaBars /></i></button>
						<ul className="menu">
							<li className="menu-item current-menu-item"><a href="index.html">Home</a></li>
							<li className="menu-item"><a href="news.html">News</a></li>
							<li className="menu-item"><a href="live-cameras.html">Live cameras</a></li>
							<li className="menu-item"><a href="photos.html">Photos</a></li>
							<li className="menu-item"><a href="contact.html">Contact</a></li>
						</ul> 
					</div>
					<div className="mobile-navigation"></div>
				</div>
			</div> 

      <div className="forecast-table">
				<div className="container">
					<div className="forecast-container">
						<div className="today forecast">
							<div className="forecast-header">
								<div className="day">{currentTime[0]}</div>
								<div className="date">{currentTime[2]} {currentTime[1]}</div>
							</div>
							<div className="forecast-content">
								<div className="location">Ha Noi</div>
								<div className="degree">
									<div className="num">{currentTime[8]}<sup>o</sup>C</div>
									<div className="forecast-icon">
                    <WeatherIcon humidity={currentTime[9]} width={90} />
									</div>	
								</div>
								<span><img src={iconUmberalla} alt=""/>{currentTime[9]}%</span>
								<span><img src={iconWind} alt=""/>{currentTime[10]} PPM</span>
								<span><img src={iconCompass} alt=""/>East</span>
							</div>

              <div className="forecast-times">
                {timeArray.map((timeItem, index) => {
                  return <div key={index} className="forecast">
                      <div className="forecast-header">
                        <div className="time">{timeItem[3]}:00</div>
                      </div> 
                      <div className="forecast-content">
                        <div className="forecast-icon">
                          <WeatherIcon humidity={timeItem[7]} width={48} />
                        </div>
                        <div className="degree">{timeItem[6]}<sup>o</sup>C</div>
                        <small><WiHumidity /> {timeItem[7]}</small>
                        <div className="co2">{timeItem[8]} PPM</div>
                      </div>
                    </div>
                })}
                
              </div>
						</div>

            {dateArray.map((dateItem, index) => {
              return <div key={index} className="forecast">
                <div className="forecast-header">
                  <div className="day">{dateItem[0]}</div>
                </div> 
                <div className="forecast-content">
                  <div className="forecast-icon">
                    <WeatherIcon humidity={dateItem[9]} width={48} />
                  </div>
                  <div className="degree">{dateItem[8]}<sup>o</sup>C</div>
                  <small><WiHumidity /> {dateItem[9]}</small>
                  <div className="">{dateItem[10]} PPM</div>
                </div>
              </div>
            })}
					</div>
				</div>
			</div>
    </div>
  )
}

const Wrapper = styled.main`
  h1 {
    margin-left: 100px;
    margin-top: 50px;
    margin-bottom: 50px;
  }
  h2 {
    margin-left: 150px;
  }
`

export default HomePage
