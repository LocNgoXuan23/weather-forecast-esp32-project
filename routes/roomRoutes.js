const express = require('express')
const router = express.Router()
const { authenticateUser, authorizePermissions } = require('../middleware/authentication')

const {
  createRoom, 
  getAllRooms, 
  getSingleRoom, 
  updateRoom, 
  deleteRoom, 
} = require('../controllers/roomController')

router
  .route('/')
  .post([authenticateUser, authorizePermissions('admin')], createRoom)
  .get(getAllRooms)

router
  .route('/:id')
  .get(getSingleRoom)
  .patch([authenticateUser, authorizePermissions('admin')], updateRoom)
  .delete([authenticateUser, authorizePermissions('admin')], deleteRoom)

module.exports = router