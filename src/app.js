import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import ErrorHandler from './middleware/errorHandler.js'
import accountRouter from './api/router.js'
import connectDB from './mongo/connectDB.js'

const app = express()

app.use(cors())

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the banking tranfer app</h1>')
})

app.use('/api/journal', accountRouter)
app.use(ErrorHandler)

export default app
