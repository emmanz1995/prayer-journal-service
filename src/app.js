import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import ErrorHandler from './middleware/errorHandler'
import accountRouter from './api/router'
import connectDB from './mongo/connectDB'

const app = express()

app.use(cors())

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the banking tranfer app</h1>')
})

app.use('/api/accounts', accountRouter)

app.use(ErrorHandler)

export default app
