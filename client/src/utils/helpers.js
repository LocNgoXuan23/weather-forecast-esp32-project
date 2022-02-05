import axios from 'axios'

export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number)
  return newNumber
}

export const formatDate = (createdAt) => {
  const date = new Date(createdAt)
      const fomatDate = date.getDate()+
      "/"+(date.getMonth()+1)+
      "/"+date.getFullYear()+
      " "+date.getHours()+
      ":"+date.getMinutes()+
      ":"+date.getSeconds() 
  if (isNaN(date.getDate())) {
    return createdAt
  }
  return fomatDate
}

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type])
  if (type === 'colors') {
    unique = unique.flat()
  }
  if (type === 'services') {
    unique = data.map((item) => item.description[type])
    unique = unique.flat()
  }
  return ['all', ...new Set(unique)]
}


export const getTimeArray = () => {
  let timeArray = Array.apply(null, Array(24)).map(Number.prototype.valueOf,0)

  timeArray = timeArray.map((timeItem, index) => {
    const newTime = new Date()
    newTime.setHours(newTime.getHours() + index + 1)

    const timeArrItem = [newTime.getDate(), newTime.getMonth()+1, newTime.getFullYear(), newTime.getHours(), newTime.getMinutes(), newTime.getSeconds(), Math.floor(Math.random() * 30), Math.floor(Math.random() * 100), Math.floor(Math.random() * 200)]
    return timeArrItem
  })

  return timeArray
}

export const getCurrentTime = () => {
  const currentTime = new Date()

  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

  const month = ["December", "January","February","March","April","May","June","July","August","September","October","November"]

  return [weekday[currentTime.getDay()], month[currentTime.getMonth()], currentTime.getDate(), currentTime.getMonth()+1, currentTime.getFullYear(), currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds(), Math.floor(Math.random() * 30), Math.floor(Math.random() * 100), Math.floor(Math.random() * 200)]
}

export const getDateArray = () => {
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

  const month = ["December", "January","February","March","April","May","June","July","August","September","October","November"]

  let dateArray = Array.apply(null, Array(6)).map(Number.prototype.valueOf,0)

  dateArray = dateArray.map((dateItem, index) => {
    const newDate = new Date()
    newDate.setDate(newDate.getDay() + index - 1)

    return [weekday[newDate.getDay()], month[newDate.getMonth()], newDate.getDate(), newDate.getMonth()+1, newDate.getFullYear(), newDate.getHours(), newDate.getMinutes(), newDate.getSeconds(), Math.floor(Math.random() * 30), Math.floor(Math.random() * 100), Math.floor(Math.random() * 200)]
  })

  return dateArray
}

export const getMainWeatherIcon = (humidity) => {
  const tmp = 100 / 14
  const count = humidity / tmp
  const finalIndex = Math.floor(count)
  return finalIndex
}


export const getTimePredict = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/v1/predictDatas?temperature=15.6&humidity=70.6&co2=65.4`)
    const data = response.data
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}







