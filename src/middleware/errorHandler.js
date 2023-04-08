import { StatusCodes } from 'http-status-codes'

const ErrorHandler = (err, req, res, next) => {
  console.log('...Error:', err)

  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went TERRIBLY wrong!',
  }

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map(val => val.message)
      .join(',')
    customError.statusCode = 400
  }

  return res
    .status(customError.statusCode)
    .json({ msg: customError.msg, statusCode: customError.statusCode })
}

export default ErrorHandler
