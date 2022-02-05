const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please provide product name'],
    namelength: [100, 'Name can not be more than 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
    default: 0
  },
  description: {
    type: String,
    required: [true, 'Please provide product description'],
    namelength: [1000, 'description can not be more than 1000 characters']
  },
  image: {
    type: String,
    default: '/uploads/example.jpeg'
  },
  category: {
    type: String,
    required: [true, 'Please provide product category'],
    enum: ['office', 'kitchen', 'bedroom', 'living room', 'dining', 'kids'],
  },
  company: {
    type: String,
    required: [true, 'Please provide product company'],
    enum: {
      values: ['ikea', 'liddy', 'marcos', 'caressa'],
      message: '{VALUE} is not supported'
    },
  },
  colors: {
    type: [String],
    default: ['#222'],
    required: true, 
  },
  featured: {
    type: Boolean,
    default: false,
  },
  feeShipping: {
    type: Boolean,
    default: false,
  },
  shipping: {
    type: Boolean,
    default: false
  },
  stock: {
    type: Number,
    default: 10,
  },
  stars: {
    type: Number,
    default: 4.5
  },
  reviews: {
    type: Number,
    default: 60,
  },
  inventory: {
    type: Number,
    required: true,
    default: 15
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  // user: {
  //   type: mongoose.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // },
}, { 
  timestamps: true, 
  toJSON: { virtuals: true } ,
  toObject: { virtuals: true }
})

module.exports = mongoose.model('Product', ProductSchema)