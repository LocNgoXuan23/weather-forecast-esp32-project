const express = require('express')
const router = express.Router()
const { authenticateUser, authorizePermissions } = require('../middleware/authentication')

const {
  getAllUsers, 
  getSingleUser, 
  showCurrentUser, 
  createUser,
  updateUser, 
  updateUserPassword,
  deleteUser,
  editUser
} = require('../controllers/userController')

router.route('/').get(authenticateUser, authorizePermissions('admin', 'owner'), getAllUsers)

router.route('/').post(authenticateUser, authorizePermissions('admin', 'owner'), createUser)
  

router.route('/showMe').get(authenticateUser, showCurrentUser)
router.route('/updateUser').patch(authenticateUser, updateUser)
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword)

router.route('/:id').get(authenticateUser, getSingleUser)
router.route('/:id').delete(authenticateUser, authorizePermissions('admin', 'owner'), deleteUser)
router.route('/:id').patch(authenticateUser, authorizePermissions('admin', 'owner'), editUser)

module.exports = router