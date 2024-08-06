import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';
import ErrorHandler from './middleware/errorHandler';
import accountRouter from './api/journal/router';
import connectDB from './mongo/connectDB';
import userRouter from './api/user';
import authRouter from './api/auth';
dotenv.config()

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

export default app;
