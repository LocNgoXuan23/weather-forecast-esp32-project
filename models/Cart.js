const mongoose = require('mongoose')

const SingleCartItemSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  color: { type: String, required: true },
  amount: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  max: { type: Number, required: true },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: true,
  }
})

const CartSchema = mongoose.Schema({
  cartItems: [SingleCartItemSchema],
  totalItems: {
    type: Number,
    require: true
  },
  totalAmount: {
    type: Number,
    require: true
  },
  shippingFee: {
    type: Number,
    require: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  userEmail: {
    type: String,
    required: true
  }
}, { 
  timestamps: true, 
  toJSON: { virtuals: true } ,
  toObject: { virtuals: true } 
})

module.exports = mongoose.model('Cart', CartSchema)