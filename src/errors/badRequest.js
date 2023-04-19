import CustomError from './authorizationError'
// import StatusCode from 'http-status-codes'

class BadRequest extends Error {
  constructor(message) {
    super(message)
  }
}

export default BadRequest
