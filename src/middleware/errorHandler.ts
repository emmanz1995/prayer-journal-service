import { Request, Response, NextFunction } from 'express'

interface IErrorCode {
  code: string;
  status: number;
}

const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const error: any = { ...err }
  error.message = err.message

  const code = errCode(err)

  return res.status(code.status || 500).json({
    errorCode: code.code,
    errorMessage: err.message || 'Internal Server Error',
  })
}

/**
 * Function for capturing error codes
 * and their respective error statuses
 * @param {Object} error
 * @returns error codes and error statues
 * */
const errCode = (error: Error) => {
  let errorCode: IErrorCode = {
    code: 'JC04',
    status: 500,
  }
  if (error.constructor.name === 'BadRequest') {
    errorCode.code = 'JC01'
    errorCode.status = 400
  } else if (error.constructor.name === 'NotFound') {
    errorCode.code = 'JC02'
    errorCode.status = 404
  } else if (error.constructor.name === 'AuthorizationError') {
    errorCode.code = 'JC03'
    errorCode.status = 401
  } else {
    errorCode.code = 'JC04' // Internal Server Error
    errorCode.status = 500
  }
  return errorCode
}

export default ErrorHandler;
