const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { FindUser } = require('../../mongo/user.model')
const BadRequest = require('../../errors/badRequest')
// const AuthenticationRequest = require('../../errors/authorizationError');

const signIn = async body => {
  const { email, password } = body
  let user = await FindUser(email)

  console.log('...user', user)

  if (!user) {
    throw new BadRequest('This email is not found!')
  }

  const comparePassword = bcrypt.compareSync(password, user?.password)

  if (!comparePassword) {
    throw new BadRequest('Your Password does not match')
  }

  console.log('...comparePassword:', comparePassword)

  const userInfo = {
    id: user.id,
    email: user.email,
    username: user.username,
  }

  const token = await jwt.sign(userInfo, process.env.SECRET_KEY, {
    expiresIn: 3600,
  })

  console.log('...token:', token)

  return {
    userInfo,
    token,
  }
}

module.exports = { signIn }
