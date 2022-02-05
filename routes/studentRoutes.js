const express = require('express')
const router = express.Router()

const {
  getAllStudents, 
} = require('../controllers/studentController')

router.route('/').get(getAllStudents)

module.exports = router