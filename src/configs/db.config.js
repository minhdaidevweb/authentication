require('dotenv').config()
const mongoose = require('mongoose')
const connectDb = mongoose.connect(process.env.URI, (error) => {
  if (error) throw error
  console.log(`Mongodb Connection.`)
})

module.exports = connectDb
