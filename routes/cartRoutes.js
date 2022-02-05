const express = require('express')
const router = express.Router()
const { authenticateUser, authorizePermissions } = require('../middleware/authentication')

const {
  createCart, 
  getAllCarts, 
  getSingleCart, 
  getCurrentUserCarts, 
  updateUpdate,
  deleteCart
} = require('../controllers/cartController')

router
  .route('/')
  .post(authenticateUser, createCart)
  .get(authenticateUser, authorizePermissions('admin'), getAllCarts)

router
  .route('/showAllMyOrders')
  .get(authenticateUser, getCurrentUserCarts)

router
  .route('/:id')
  .get(authenticateUser, authorizePermissions('admin'), getSingleCart)
  .patch(authenticateUser, updateUpdate)

router
  .route('/:id')
  .delete(authenticateUser, authorizePermissions('admin'), deleteCart)

module.exports = router