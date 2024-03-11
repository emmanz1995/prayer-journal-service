const mongoose = require('mongoose')
const { MONGODB_URI } = require('../utils/config')

const connectDB = async () => {
  // const { MONGODB_URI } = process.env
  try {
    await mongoose?.connect(`${MONGODB_URI}`)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

module.exports = connectDB
