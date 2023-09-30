const express = require('express')
require('express-async-errors')
const cors = require('cors')
const ErrorHandler = require('./middleware/errorHandler')
const accountRouter = require('./api/router')
const connectDB = require('./mongo/connectDB')
const { bibleConnector } = require('./connector')

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
app.use(ErrorHandler)

module.exports = app
