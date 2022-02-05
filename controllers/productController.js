const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const createProduct = async (req, res) => {
  req.body.user = req.user.userId
  const product = await Product.create(req.body)

  res.status(StatusCodes.CREATED).json({ product })
}

const getAllProducts = async (req, res) => {
  const { featured, shipping, company, name, category, sort, fields, numericFilters, colors } = req.query
  const queryObject = {}

  // featured: featured=true - featured=false
  // company: comapny=ikea
  // name: name=a - name=ab (https://docs.mongodb.com/manual/reference/operator/query/regex/#mongodb-query-op.-regex)
  // sort: sort=name - sort=-name - sort=name,price
  // fields: fields=name - fields=name,price
  // limit: limit=10
  // skip: skip=0
  // page: page=4
  // numericFilters: numericFilters=price>30

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false
  }
  if (shipping) {
    queryObject.shipping = shipping === 'true' ? true : false
  }
  if (company) {
    queryObject.company = company
  }
  if (category) {
    queryObject.category = category
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }
  if (colors) {
    queryObject.colors = { $all: colors.split(',') }
  }
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
    const options = ['price', 'rating']
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-')
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) }
      }
    })
  }

  let result =  Product.find(queryObject)
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

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 30
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const products = await result
  res.status(StatusCodes.OK).json({ count: products.length, products })
}

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params
  const product = await Product.findOne({ _id: productId })
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`)
  }

  res.status(StatusCodes.OK).json({ product })
}

const updateProduct = async (req, res) => {
  const { id: productId } = req.params
  const product = await Product.findOneAndUpdate(
    { _id: productId }, 
    req.body, { new: true, runValidators: true }
  )
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`)
  }

  res.status(StatusCodes.OK).json({ product })
}

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params
  const product = await Product.findOne({ _id: productId })
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${productId}`)
  }
  
  await product.remove()
  res.status(StatusCodes.OK).json({ msg: 'Success! Product removed.' })
}

module.exports = {
  createProduct, 
  getAllProducts, 
  getSingleProduct, 
  updateProduct, 
  deleteProduct, 
}