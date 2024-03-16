const express = require('express')
const { check, validationResult } = require('express-validator')
const _ = require('lodash')
const { signUp } = require('./service')
const BadRequest = require('../../errors/badRequest')
const { verifyRolesExisted } = require('../../middleware/verifyRoles')

const router = express.Router()

router.post(
  '/',
  [
    check('username', 'Username is required').not().notEmpty(),
    check('email', 'Email is required').isEmail().not().notEmpty(),
    check('password', 'Password is required').not().notEmpty(),
    // check('confirmPassword', 'Password is required').not().notEmpty(),
  ],
  verifyRolesExisted,
  async (req, res, next) => {
    const result = validationResult(req)
    const errorMessage = _.map(result.array(), x => x.msg).join(', ')

    if (!result.isEmpty()) {
      throw new BadRequest(`${errorMessage}`)
    }

    try {
      res.status(201).json(await signUp(req.body))
    } catch (err) {
      next(err)
    }
  },
)

module.exports = router
