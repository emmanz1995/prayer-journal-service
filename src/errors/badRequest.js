import CustomError from './customError'
import StatusCode from 'http-status-codes'

class BadRequest extends CustomError {
  constructor(message) {
    super(message)
    this.statusCode = StatusCode.BAD_REQUEST
  }
}

export default BadRequest
