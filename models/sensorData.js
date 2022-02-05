const mongoose = require('mongoose')

const sensorDataSchema = new mongoose.Schema({
  temperature: {
    type: Number,
    required: [true, 'Please provide product temperature'],
  },
  humidity: {
    type: Number,
    required: [true, 'Please provide product humidity'],
  },
  co2: {
    type: Number,
    required: [true, 'Please provide product co2'],
  },
}, { 
  timestamps: true, 
  toJSON: { virtuals: true } ,
  toObject: { virtuals: true }
})

module.exports = mongoose.model('sensorData', sensorDataSchema)