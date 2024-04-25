const mongoose = require('mongoose')
const connectDB = require('./connectDB')

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}))

describe('test', () => {
  it('should connect to mongo db', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log')

    await connectDB()
    expect(consoleLogSpy).toHaveBeenCalledTimes(1)
    expect(consoleLogSpy).toHaveBeenCalledWith('Connected to MongoDB')
  })
})
