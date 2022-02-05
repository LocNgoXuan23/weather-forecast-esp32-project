const express = require('express')
const router = express.Router()

const {
  getAllSensorData,
  createSensorData
} = require('../controllers/sensorDataController')

router.route('/').get(getAllSensorData)
router.route('/').post(createSensorData)

module.exports = router