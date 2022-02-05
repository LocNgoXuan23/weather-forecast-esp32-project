const express = require('express')
const router = express.Router()

const {
  getPredictData,
  getPredictTimeArray,
  getPredictDateArray
} = require('../controllers/predictDataController')

router.route('/getPredictTimeArray').get(getPredictTimeArray)
router.route('/getPredictDateArray').get(getPredictDateArray)
router.route('/').get(getPredictData)

module.exports = router