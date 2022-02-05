const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    namelength: [100, 'Name can not be more than 100 characters']
  },
}, { 
  timestamps: true, 
  toJSON: { virtuals: true } ,
  toObject: { virtuals: true }
})

module.exports = mongoose.model('Student', StudentSchema)