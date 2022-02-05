const mongoose = require('mongoose')

const RoomDescriptionSchema = mongoose.Schema({
  size: {
    type: Number,
    required: [true, 'Please provide product size'],
    default: 0
  },
  capacity: {
    type: String,
    trim: true,
    required: [true, 'Please provide product capacity'],
    namelength: [100, 'Name can not be more than 100 characters']
  },
  services: {
    type: [String],
    required: [true, 'Please provide product services'],
  },
  bed: {
    type: String,
    trim: true,
    required: [true, 'Please provide product bed'],
  },
})

const RoomSchema = new mongoose.Schema({
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
  description: RoomDescriptionSchema,
  image: {
    type: String,
    required: [true, 'Please provide product image'],
  },
  featured: {
    type: Boolean,
    default: false,
  }
}, { 
  timestamps: true, 
  toJSON: { virtuals: true } ,
  toObject: { virtuals: true }
})

module.exports = mongoose.model('Room', RoomSchema)