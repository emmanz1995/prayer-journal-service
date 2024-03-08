const express = require('express')
const { check, validationResult } = require('express-validator')
const { signIn } = require('./service')
const _ = require('lodash')
const BadRequest = require('../../errors/badRequest')
const authJwt = require('../../middleware/authJwt')

const authRouter = express.Router()

// endpoint for user authentication
authRouter.post(
  '/',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res, next) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      throw new BadRequest(
        `${result
          .array()
          .map(res => res.msg)
          .join(', ')}`,
      )
    }
    const user = await signIn(req.body)
    try {
      const response = _.omit(user, 'password')
      res.status(200).json(response)
    } catch (err) {
      next(err)
    }
  },
)

authRouter.get('/me', authJwt, async (req, res, next) => {
  res.status(200).json(req.user)
})

module.exports = authRouter
