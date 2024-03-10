const jwt = require('jsonwebtoken')
const AuthorizationError = require('../errors/authorizationError')
const { FindUserById } = require('../mongo/user.model')

const authJwt = async (req, res, next) => {
  let token

  if (req.headers?.authorization?.startsWith('Bearer')) {
    token = req?.headers?.authorization?.split(' ')[1]

    try {
      if (token) {
        const decoded = await jwt.verify(token, process.env.SECRET_KEY)
        req.user = await FindUserById(decoded.id)
        next()
      }
    } catch (err) {
      next()
      throw new AuthorizationError('Unauthorized access!')
    }
  } else {
    throw new AuthorizationError('Unauthorized access!')
  }
}

module.exports = authJwt
