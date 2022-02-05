const express = require('express')
const router = express.Router()
const { authenticateUser, authorizePermissions } = require('../middleware/authentication')

const {
  createBooking, 
  getAllBookings, 
  getSingleBooking, 
  getCurrentUserBookings,
  updateBooking, 
  deleteBooking,
  adminCreateBooking
} = require('../controllers/bookingController')

router
  .route('/')
  .post(authenticateUser, createBooking)
  .get([authenticateUser, authorizePermissions('admin')], getAllBookings)

router
  .route('/showAllMyBookings')
  .get(authenticateUser, getCurrentUserBookings)

router
  .route('/adminCreateBooking')
  .post([authenticateUser, authorizePermissions('admin')], adminCreateBooking)

router
  .route('/:id')
  .get(authenticateUser, getSingleBooking)
  .patch(authenticateUser, updateBooking)
  .delete(authenticateUser, deleteBooking)

module.exports = router