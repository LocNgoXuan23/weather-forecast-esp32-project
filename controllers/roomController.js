const Room = require('../models/Room')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const createRoom = async (req, res) => {
  req.body.user = req.user.userId
  const room = await Room.create(req.body)

  res.status(StatusCodes.CREATED).json({ room })
}

const getAllRooms = async (req, res) => {
  const { featured, name, service, sort, fields, numericFilters } = req.query
  const queryObject = {}

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }
  if (service) {
    queryObject['description.services'] = { $all: service.split(',') } 
  }
  console.log(numericFilters)
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    }
    const regEx = /\b(<|>|>=|=|<|<=)\b/g
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    )
    const options = ['price', 'rating', 'description.size']
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-')
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) }
      }
    })
  }

  let result =  Room.find(queryObject)
  // sort 
  if (sort) {
    const sortList = sort.split(',').map((sortItem) => {
      if (sortItem === 'price-lowest') return 'price'
      if (sortItem === 'price-highest') return '-price'
      if (sortItem === 'name-a') return 'name'
      if (sortItem === 'name-z') return '-name'
    }).join(' ')
    result = result.sort(sortList)
  }

  // fields
  if (fields) {
    const fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
  }

  const rooms = await result

  res.status(StatusCodes.OK).json({ count: rooms.length, rooms })
}

const getSingleRoom = async (req, res) => {
  const { id: roomId } = req.params
  const room = await Room.findOne({ _id: roomId })
  if (!room) {
    throw new CustomError.NotFoundError(`No room with id : ${roomId}`)
  }

  res.status(StatusCodes.OK).json({ room })
}

const updateRoom = async (req, res) => {
  const { id: roomId } = req.params
  const room = await Room.findOneAndUpdate(
    { _id: roomId }, 
    req.body, { new: true, runValidators: true }
  )
  if (!room) {
    throw new CustomError.NotFoundError(`No room with id : ${roomId}`)
  }

  res.status(StatusCodes.OK).json({ room })
}

const deleteRoom = async (req, res) => {
  const { id: roomId } = req.params
  const room = await Room.findOne({ _id: roomId })

  if (!room) {
    throw new CustomError.NotFoundError(`No room with id : ${roomId}`)
  }
  
  await room.remove()
  res.status(StatusCodes.OK).json({ msg: 'Success! room removed.' })
}

module.exports = {
  createRoom, 
  getAllRooms, 
  getSingleRoom, 
  updateRoom, 
  deleteRoom, 
  createRoom
}