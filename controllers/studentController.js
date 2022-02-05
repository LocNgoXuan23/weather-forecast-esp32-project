const Student = require('../models/Student')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const getAllStudents = async (req, res) => {
  const students = await Student.find({}).sort('name')
  res.status(StatusCodes.OK).json({ count: students.length, students })
} 

module.exports = {
  getAllStudents
}