const mongoose = require('mongoose')

const BookingScheme = new mongoose.Schema({
  checkIn: {
    type: String,
    trim: true,
    required: [true, 'Please provide booking checkIn'],
    namelength: [100, 'Name can not be more than 100 characters']
  },
  checkOut: {
    type: String,
    trim: true,
    required: [true, 'Please provide booking checkOut'],
    namelength: [100, 'Name can not be more than 100 characters']
  },
  guests: {
    type: String,
    required: [true, 'Please provide booking guests'],
    enum: {
      values: ['2 adults', '3 adults'],
      message: '{VALUE} is not supported'
    },
  },
  room: {
    type: String,
    required: [true, 'Please provide booking room'],
    enum: {
      values: ['1 room', '2 room'],
      message: '{VALUE} is not supported'
    },
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  userEmail: {
    type: mongoose.Schema.Types.String,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true, 
  toJSON: { virtuals: true } ,
  toObject: { virtuals: true }
})

module.exports = mongoose.model('Booking', BookingScheme)