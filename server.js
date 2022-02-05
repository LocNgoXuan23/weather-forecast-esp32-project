require('dotenv').config()
require('express-async-errors')
const path = require('path')

// express
const express = require('express')
const app = express()

// rest of the packages
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')

// database 
const mongoose = require('mongoose')


// routers
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const bookingRouter = require('./routes/bookingRoutes')
const productRouter = require('./routes/productRoutes')
const cartRouter = require('./routes/cartRoutes')
const roomRouter = require('./routes/roomRoutes')
const studentRouter = require('./routes/studentRoutes')
const sensorDataRouter = require('./routes/sensorDataRoutes')
const predictDataRouter = require('./routes/predictDataRouters')

// middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(cors())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/bookings', bookingRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/carts', cartRouter)
app.use('/api/v1/rooms', roomRouter)
app.use('/api/v1/students', studentRouter)
app.use('/api/v1/predictDatas', predictDataRouter)

// app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// Connect to mongodb
const URI = process.env.MONGO_URL
mongoose.connect(URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}, err => {
    if(err) throw err;
    console.log("Connected to mongodb")
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})