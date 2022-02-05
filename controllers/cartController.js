const Cart = require('../models/Cart')
const User = require('../models/User')
const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { checkPermissions } = require('../utils')

const createCart = async (req, res) => {
  const { cart: cartItems, total_items: totalItems, total_amount: totalAmount, shipping_fee: shippingFee } = req.body

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError('No cart items provided')
  }

  if (!totalItems || !totalAmount || !shippingFee) {
    throw new CustomError.BadRequestError(
      'Please provide totalItems and totalAmount and shippingFee'
    )
  }

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product })
    if (!dbProduct) {
      throw new CustomError.NotFoundError(
        `No product with id : ${item.product}`
      )
    }
  }

  const user = await User.findOne({ _id: req.user.userId }).select('-password')
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${req.user.userId}`)
  }

  const cart = await Cart.create({
    cartItems, 
    totalItems, 
    totalAmount, 
    shippingFee,
    user: req.user.userId,
    userEmail: user.email
  })

  res.status(StatusCodes.CREATED).json({ cart })
}

const getAllCarts = async (req, res) => {
  const carts = await Cart.find({})

  res.status(StatusCodes.OK).json({ count: carts.length, carts })
}

const getSingleCart = async (req, res) => {
  const { id: cartId } = req.params
  const cart = await Cart.findOne({ _id: cartId }) 
  if (!cart) {
    throw new CustomError.NotFoundError(`No cart with id : ${cartId}`)
  }
  checkPermissions(req.user, cart.user)
  res.status(StatusCodes.OK).json({ cart })
}

const getCurrentUserCarts = async (req, res) => {
  const carts = await Cart.find({ user: req.user.userId })
  res.status(StatusCodes.OK).json({ count: carts.length, carts })
}

const updateUpdate = async (req, res) => {
  const { id: cartId } = req.params
  const cart = await Cart.findOne({ _id: cartId }) 
  if (!cart) {
    throw new CustomError.NotFoundError(`No cart with id : ${cartId}`)
  }
  checkPermissions(req.user, cart.user)
  await cart.save()

  res.status(StatusCodes.OK).json({ cart })
}

const deleteCart = async (req, res) => {
  const { id: cartId } = req.params
  const cart = await Cart.findOne({ _id: cartId })
  if (!cart) {
    throw new CustomError.NotFoundError(`No cart with id : ${cartId}`)
  }

  await cart.remove()
  res.status(StatusCodes.OK).json({ msg: 'Success! cart removed.' })
}

module.exports = {
  createCart, 
  getAllCarts, 
  getSingleCart, 
  getCurrentUserCarts, 
  updateUpdate,
  deleteCart
}