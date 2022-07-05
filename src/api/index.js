const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const router = require('./routers')
const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

// route
app.use(router)

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error handler function
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {}
  const status = err.status || 500
  return res.status(status).json({
    error: {
      message: error.message,
    },
  })
})

module.exports = app
