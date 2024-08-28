const _ = require('lodash')
const bcrypt = require('bcryptjs')
const {
  AddNewUser,
  // FindUsers,
  // FindUserById,
  FindUser,
  // UpdateUser,
  updateUserPhoto
} = require('../../mongo/user.model')
const { getAllRoles } = require('../../mongo/roles.model')
const BadRequest = require('../../errors/badRequest')

const signUp = async body => {
  const {
    username,
    email,
    password,
    confirmPassword,
    avatarUrl,
    coverPhotoUrl,
    denomination,
    roles,
  } = body
  let user = await FindUser(email)
  // if(password !== confirmPassword) {
  //   throw new BadRequest('Password and confirm password do not match');
  // }

  let rolesFound = await getAllRoles(roles)

  if (user) {
    throw new BadRequest('user already exists')
  }

  try {
    const salt = bcrypt.genSaltSync(10)

    const hashedPassword = bcrypt.hashSync(password, salt)

    user = await AddNewUser({
      username,
      email,
      password: password,
      avatarUrl,
      coverPhotoUrl,
      denomination,
      roles: rolesFound.map(role => role._id),
    })

    user.password = hashedPassword
    user.save()

    return user
  } catch (err) {
    throw err
  }
}

const updateProfilePic = async() => {}

module.exports = { signUp, updateProfilePic }
