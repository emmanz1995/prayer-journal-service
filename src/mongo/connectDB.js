import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async () => {
  const { MONGODB_URI } = process.env
  try {
    await mongoose.connect(`${MONGODB_URI}`)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.log(err)
  }
}

export default connectDB
