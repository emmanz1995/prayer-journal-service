const express = require('express');
const { check, validationResult } = require('express-validator')
const _ = require('lodash');
// const bcrypt = require('bcryptjs');
const { signUp } = require('./service');
const BadRequest = require('../../errors/badRequest')

const router = express.Router()

router.post('/', [
  check('username', 'Username is required').not().notEmpty(),
  check('email', 'Email is required').isEmail().not().notEmpty(),
  check('password', 'Password is required').not().notEmpty(),
], async (req, res, next) => {
  const result = validationResult(req)
  if (!result.isEmpty())
    return
      new BadRequest(
        `${result
          .array()
          .map(x => x.msg)
          .join(', ')}`
      )
  // console.log('req.body', await signUp(req.body));

  const createdUser = await signUp(req.body);

  try {
    res.json(createdUser)
  } catch(err) {
    next(err)
  }
});

module.exports = router;