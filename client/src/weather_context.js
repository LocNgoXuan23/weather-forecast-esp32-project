import React, { useEffect, useContext, useReducer, useState } from 'react'
import axios from 'axios'

const WeatherContext = React.createContext()

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const month = ["December", "January","February","March","April","May","June","July","August","September","October","November"]


export const WeatherProvider = ({ children }) => {
  const [timeArray, setTimeArray] = useState(null)
  const [dateArray, setDateArray] = useState(null)
  const [currentTime, setCurrentTime] = useState(null)

  useEffect(() => {
    getTimeArray()
    getCurrentTime()
    getDateArray()
  }, [])

  
  
  const getCurrentTime = async () => {
    const currentTime = new Date()

    try {
      const currentDataResponse = await axios.get(`https://api.thingspeak.com/channels/1646188/feeds.json?api_key=BMI6QWOJLJO48STT&results=1`)
      const { field1, field2, field3 } = currentDataResponse.data.feeds[0]

      const response = await axios.get(`/api/v1/predictDatas?temperature=${field1}&humidity=${field2}&co2=${field3}`)
      const { predTemperature: temperature, predHumidity: humidity, predCo2: co2 } = response.data
      setCurrentTime([weekday[currentTime.getDay()], month[currentTime.getMonth()], currentTime.getDate(), currentTime.getMonth()+1, currentTime.getFullYear(), currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds(), Math.round(temperature), Math.round(humidity), Math.round(co2)])
    } catch (error) {
      console.log(error)
    }
  }

  const getTimeArray = async () => {
    const currentTime = new Date()
    let timeArray = Array.apply(null, Array(24)).map(Number.prototype.valueOf,0)
    let predictTimeArray
    
    try {
      const currentDataResponse = await axios.get(`https://api.thingspeak.com/channels/1646188/feeds.json?api_key=BMI6QWOJLJO48STT&results=1`)
      const { field1: temperature, field2: humidity, field3: co2 } = currentDataResponse.data.feeds[0]
      let tmp = currentTime.getMinutes()
      const predictTimeArrayResponse = await axios.get(`/api/v1/predictDatas/getPredictTimeArray?cMinutes=${tmp}&temperature=${temperature}&humidity=${humidity}&co2=${co2}`)
      predictTimeArray = predictTimeArrayResponse.data.predictTimeArray
    } catch (error) {
      console.log(error)
    }

    timeArray = timeArray.map((timeItem, index) => {
      const newTime = new Date()
      newTime.setHours(newTime.getHours() + index + 1)
  
      const timeArrItem = [newTime.getDate(), newTime.getMonth()+1, newTime.getFullYear(), newTime.getHours(), newTime.getMinutes(), newTime.getSeconds(), Math.round(predictTimeArray[index].temperature), Math.round(predictTimeArray[index].humidity), Math.round(predictTimeArray[index].co2)]

      return timeArrItem
    })
    setTimeArray(timeArray)
  }
  
  const getDateArray = async () => {
    const currentTime = new Date()
    let predictDateArray

    try {
      const currentDataResponse = await axios.get(`https://api.thingspeak.com/channels/1646188/feeds.json?api_key=BMI6QWOJLJO48STT&results=1`)
      const { field1: temperature, field2: humidity, field3: co2 } = currentDataResponse.data.feeds[0]
      let tmp1 = currentTime.getHours()
      let tmp2 = currentTime.getMinutes()
      const predictDateArrayResponse = await axios.get(`/api/v1/predictDatas/getPredictDateArray?cHours=${tmp1}&cMinutes=${tmp2}&temperature=${temperature}&humidity=${humidity}&co2=${co2}`)
      predictDateArray = predictDateArrayResponse.data.predictDateArray
    } catch (error) {
      console.log(error)
    }

    let dateArray = Array.apply(null, Array(6)).map(Number.prototype.valueOf,0)
  
    dateArray = dateArray.map((dateItem, index) => {
      const newDate = new Date()
      newDate.setDate(newDate.getDay() + index)
  
      return [weekday[newDate.getDay()], month[newDate.getMonth()], newDate.getDate(), newDate.getMonth()+1, newDate.getFullYear(), newDate.getHours(), newDate.getMinutes(), newDate.getSeconds(), Math.round(predictDateArray[index].temperature), Math.round(predictDateArray[index].humidity), Math.round(predictDateArray[index].co2)]
    })
    setDateArray(dateArray)
  }
  
  const getMainWeatherIcon = (humidity) => {
    const tmp = 100 / 14
    const count = humidity / tmp
    const finalIndex = Math.floor(count)
    return finalIndex
  }
  
  const getTimePredict = async () => {
    try {
      const response = await axios.get(`/api/v1/predictDatas?temperature=15.6&humidity=70.6&co2=65.4`)
      const data = response.data
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <WeatherContext.Provider value={{
      getTimeArray,
      getCurrentTime,
      getDateArray,
      getMainWeatherIcon,
      getTimePredict,
      timeArray,
      dateArray,
      currentTime
    }}>
      {children}
    </WeatherContext.Provider>
  )
}
// make sure use
export const useWeatherContext = () => {
  return useContext(WeatherContext)
}
