const express = require('express')
require('express-async-errors')
const cors = require('cors')
const ErrorHandler = require('./middleware/errorHandler')
const accountRouter = require('./api/journal/router')
const connectDB = require('./mongo/connectDB')
const userRouter = require('./api/user')
const authRouter = require('./api/auth')

const app = express()

app.use(cors())

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the banking tranfer app</h1>')
})

// bibleConnector({ book: 'John', chapter: '1', verse: '3', translation: 'web' }).then(res => console.log(res))

app.use('/api/journal', accountRouter)
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use(ErrorHandler)

module.exports = app
