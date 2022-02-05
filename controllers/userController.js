const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { createTokenUser, attachCookiesToResponse, checkPermissions } = require('../utils')

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-password')
  console.log('getAllUsers')
  res.status(StatusCodes.OK).json({ count: users.length, users })
}

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select('-password')
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`)
  }

  checkPermissions(req.user, user._id)

  res.status(StatusCodes.OK).json({ user })
}

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user })
}

const createUser = async (req, res) => {
  const { email, name, password } = req.body

  const emailAlreadyExists = await User.findOne({ email })
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists')
  }

  const user = await User.create({ name, email, password })
  console.log('create')
  res.status(StatusCodes.CREATED).json({ user })
}

const updateUser = async (req, res) => {
  const { email, name } = req.body
  if (!email || !name) {
    throw new CustomError.BadRequestError('Please provide all values')
  }
  const user = await User.findOne({ _id: req.user.userId })

  user.email = email
  user.name = name

  await user.save()

  const tokenUser = createTokenUser(user)
  attachCookiesToResponse({ res, user: tokenUser })
  res.status(StatusCodes.OK).json({ user: tokenUser })
}

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError('Please provide both values')
  }

  const user = await User.findOne({ _id: req.user.userId })

  const isPasswordCorrect = await user.comparePassword(oldPassword)
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }
  user.password = newPassword

  await user.save()
  res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' })
}

const editUser = async (req, res) => {
  const { id: userId } = req.params
  const { name, email, password } = req.body
  const user = await User.findOne({ _id: userId })
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${userId}`)
  }

  if (!name || !email) {
    throw new CustomError.BadRequestError('Please provide all values')
  }

  user.email = email
  user.name = name
  if (password) {
    user.password = password
  }
  await user.save()
  res.status(StatusCodes.OK).json({ user: user })
}

const deleteUser = async (req, res) => {
  const { id: userId } = req.params
  const user = await User.findOne({ _id: userId })
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${userId}`)
  }
  
  await user.remove()
  res.status(StatusCodes.OK).json({ msg: 'Success! user removed.' })
}

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  createUser,
  updateUser,
  updateUserPassword,
  deleteUser,
  editUser
}