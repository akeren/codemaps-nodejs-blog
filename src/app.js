require('dotenv').config({
  path: 'config.env'
})
const express = require('express')
const { engine } = require('express-edge')
const edge = require('edge.js')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const connectMongo = require('connect-mongo')
const connectFlash = require('connect-flash')
const cloudinary = require('cloudinary')

// IMPORT ROUTES
const homeRouter = require('./routes/homeRoutes')
const postRouter = require('./routes/postRoutes')
const userRouter = require('./routes/userRoutes')
const aboutRouter = require('./routes/aboutRoutes')
const contactRouter = require('./routes/contactRoutes')

const app = new express()

app.use(connectFlash())
const MongoStore = connectMongo(session)
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
)
app.use(fileUpload())
cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_NAME
})
app.use(express.static(`${__dirname}/public`))
app.use(engine)
app.set('views', `${__dirname}/views`)
app.use('*', (req, res, next) => {
  edge.global('auth', req.session.userId)
  next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ROUTES
app.use(homeRouter)
app.use(contactRouter)
app.use(aboutRouter)
app.use('/post', postRouter)
app.use('/auth', userRouter)
app.use('/users', userRouter)

app.use((req, res) => res.render('404'))

module.exports = { app}
