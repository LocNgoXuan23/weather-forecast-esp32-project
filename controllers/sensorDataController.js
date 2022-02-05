const SensorData = require('../models/sensorData')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const getAllSensorData = async (req, res) => {
  const sensorDatas = await SensorData.find({})
  res.status(StatusCodes.OK).json({ count: sensorDatas.length, sensorDatas })
} 

const createSensorData = async (req, res) => {
  const { temperature, humidity, co2 } = req.query
  const sensorData = await SensorData.create({ temperature, humidity, co2 })
  res.status(StatusCodes.CREATED).json({ sensorData })
}

module.exports = {
  getAllSensorData,
  createSensorData
}