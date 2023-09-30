const ErrorHandler = (err, req, res, next) => {
  const error = { ...err }
  error.message = err.message

  const code = errCode(err)

  return res.status(code.status || 500).json({
    errorCode: code.code,
    errorMessage: err.message || 'Server Error',
  })
}

/**
 * Function for capturing error codes
 * and their respective error statuses
 * @param {Object} error
 * @returns error codes and error statues
 * */
const errCode = error => {
  let errorCode = {}
  if (error.constructor.name === 'BadRequest') {
    errorCode.code = 'JC01'
    errorCode.status = 400
  } else if (error.constructor.name === 'NotFound') {
    errorCode = 'JC02'
    errorCode = 404
    // TODO: For the future
  } else if (error.constructor.name === 'AuthorizationError') {
    errorCode.code = 'JC03'
    errorCode.status = 401
  } else {
    errorCode.code = 'Internal Server Error'
    errorCode.status = 500
  }
  return errorCode
}

module.exports = ErrorHandler
