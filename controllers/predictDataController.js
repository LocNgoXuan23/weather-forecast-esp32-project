const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const getPredictData = async (req, res) => {
  let { temperature, humidity, co2 } = req.query
  temperature = parseFloat(temperature)
  humidity = parseFloat(humidity)
  co2 = parseFloat(co2)

  const { temperature: predTemperature, humidity: predHumidity, co2: predCo2 } = linearRegressionPredict(temperature, humidity, co2)

  res.status(StatusCodes.OK).json({ predTemperature, predHumidity, predCo2 })
} 

const getPredictTimeArray = async (req, res) => {
  let { cMinutes, temperature, humidity, co2 } = req.query
  cMinutes = parseFloat(cMinutes)
  temperature = parseFloat(temperature)
  humidity = parseFloat(humidity)
  co2 = parseFloat(co2)

  let currentPredict = { temperature, humidity, co2 }

  let predictTimeArray = Array.apply(null, Array(24)).map(Number.prototype.valueOf,0)
  
  predictTimeArray = predictTimeArray.map((predictItem, index) => {
    if (index === 0) {
      const remaining = 60 - cMinutes
      for (let i = 0; i < remaining; i++) {
        currentPredict = linearRegressionPredict(currentPredict.temperature, currentPredict.humidity, currentPredict.co2)
      }
      return currentPredict
    }

    for (let i = 0; i < 60; i++) {
      currentPredict = linearRegressionPredict(currentPredict.temperature, currentPredict.humidity, currentPredict.co2)
    }
    return currentPredict
  })

  res.status(StatusCodes.OK).json({ predictTimeArray, count: predictTimeArray.length })
}

const getPredictDateArray = async (req, res) => {
  let { cHours, cMinutes, temperature, humidity, co2 } = req.query
  cHours = parseFloat(cHours)
  cMinutes = parseFloat(cMinutes)
  temperature = parseFloat(temperature)
  humidity = parseFloat(humidity)
  co2 = parseFloat(co2)

  let currentPredict = { temperature, humidity, co2 }
  console.log(currentPredict)

  let predictDateArray = Array.apply(null, Array(6)).map(Number.prototype.valueOf,0) 

  predictDateArray = predictDateArray.map((predictItem, index) => {
    if (index === 0) {
      const remaining = 1440 - (cHours * 60 + cMinutes)
      console.log(remaining)
      for (let i = 0; i < remaining; i++) {
        currentPredict = linearRegressionPredict(currentPredict.temperature, currentPredict.humidity, currentPredict.co2)
      }
      return currentPredict
    }

    for (let i = 0; i < 1440; i++) {
      currentPredict = linearRegressionPredict(currentPredict.temperature, currentPredict.humidity, currentPredict.co2)
    }
    return currentPredict
  })

  res.status(StatusCodes.OK).json({ predictDateArray, count: predictDateArray.length })
}



const linearRegressionPredict = (temperature, humidity, co2) => {
  const coef = [[ 0.62173961, -0.01735661, -0.01735661],
  [-0.99923896, 0.41824919, 0.41824919],
  [-0.99923896, 0.41824919, 0.41824919]]

  const intercept = [ 8.72666237, 28.73884886, 28.73884886]

  const predTemperature = coef[0][0]*Math.pow(temperature, 1) + coef[0][1]*Math.pow(humidity, 1) + coef[0][2]*Math.pow(co2, 1) + intercept[0]

  const predHumidity = coef[1][0]*Math.pow(temperature, 1) + coef[1][1]*Math.pow(humidity, 1) + coef[1][2]*Math.pow(co2, 1) + intercept[1]

  const predCo2 = coef[2][0]*Math.pow(temperature, 1) + coef[2][1]*Math.pow(humidity, 1) + coef[2][2]*Math.pow(co2, 1) + intercept[2]

  return { temperature: predTemperature, humidity: predHumidity, co2: predCo2 }
}

module.exports = {
  getPredictData,
  getPredictTimeArray,
  getPredictDateArray
}