const Booking = require('../models/Booking')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const createBooking = async (req, res) => {
  req.body.user = req.user.userId
  req.body.userEmail = req.user.email

  const user = await User.findOne({ _id: req.user.userId }).select('-password')
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.user.userId}`)
  }

  req.body.userEmail = user.email

  const booking = await Booking.create(req.body)

  res.status(StatusCodes.CREATED).json({ booking })
}

const adminCreateBooking = async (req, res) => {
  const { checkIn, checkOut, guests, room, email } = req.body
  const user = await User.findOne({ email: email }).select('-password')
  if (!user) {
    throw new CustomError.NotFoundError(`No user with email : ${email}`)
  }
  const { id: userId, email: userEmail } = user
  req.body = { checkIn, checkOut, guests, room, user: userId, userEmail }

  const booking = await Booking.create(req.body)

  res.status(StatusCodes.CREATED).json({ booking })
} 

const getAllBookings = async (req, res) => {
  const bookings = await Booking.find({})
  res.status(StatusCodes.OK).json({ count: bookings.length, bookings })
}

const getSingleBooking = async (req, res) => {
  const { id: bookingId } = req.params
  const booking = await Booking.findOne({ _id: bookingId })

  if (!booking) {
    throw new CustomError.NotFoundError(`No booking with id : ${bookingId}`)
  }

  res.status(StatusCodes.OK).json({ booking })
}

const getCurrentUserBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.userId })
  res.status(StatusCodes.OK).json({ count: bookings.length, bookings })
}

const updateBooking = async (req, res) => {
  const { id: bookingId } = req.params
  const booking = await Booking.findOneAndUpdate(
    { _id: bookingId },
    req.body, { new: true, runValidators: true } 
  )
  if (!booking) {
    throw new CustomError.NotFoundError(`No booking with id : ${bookingId}`)
  }
  res.status(StatusCodes.OK).json({ booking })
}

const deleteBooking = async (req, res) => {
  const { id: bookingId } = req.params
  const booking = await Booking.findOne({ _id: bookingId })
  if (!booking) {
    throw new CustomError.NotFoundError(`No booking with id : ${bookingId}`)
  }
  
  await booking.remove()
  res.status(StatusCodes.OK).json({ msg: 'Success! booking removed.' })
}

module.exports = {
  createBooking, 
  getAllBookings, 
  getSingleBooking, 
  getCurrentUserBookings,
  updateBooking, 
  deleteBooking,
  adminCreateBooking
}