const bcrypt = require('bcryptjs')
const { getUserRoles, createUserRoles, countUserRoles } = require('./roles.model');
const { FindUser, AddNewUser } = require('./user.model')

const { ADMIN_PASSWORD, MODERATOR_PASSWORD } = process.env;

const createRoles = async () => {
  try {
    const count = await countUserRoles()

    if(count > 0) return

    const roles = await Promise.all([
      await createUserRoles('user'),
      await createUserRoles('moderator'),
      await createUserRoles('admin'),
    ])

    console.log('...roles:', roles)
  } catch(err) {
    console.error(err)
  }
}

const createAdminUser = async () => {
  const roles = await getUserRoles('admin')
  const user = await FindUser('test@gmail.com')

  try {
    if(!user) {
      const newuser = await AddNewUser({
        username: 'test',
        email: 'test@gmail.com',
        password: bcrypt.hashSync(ADMIN_PASSWORD, bcrypt.genSaltSync(12)),
        roles: roles.map(role => role._id)
      })

      console.log('Admin Created...', newuser)
    }
  } catch (err) {
    console.error(err)
  }
}
const createModUser = async () => {
  const roles = await getUserRoles('moderator')
  const user = await FindUser('moderator@gmail.com')

  try {
    if(!user) {
      await AddNewUser({
        username: 'Mod',
        email: 'moderator@gmail.com',
        password: bcrypt.hashSync(ADMIN_PASSWORD, bcrypt.genSaltSync(12)),
        roles: roles.map(role => role._id)
      })

      console.log('Mod created...')
    }
  } catch(err) {
    console.error(err)
  }
}

module.exports = { createRoles, createAdminUser, createModUser }