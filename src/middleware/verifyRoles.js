const { ROLES } = require('../mongo/roles.model')
const NotFound = require('../errors/authorizationError')

const verifyRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    const { roles } = req.body
    for (const role of roles) {
      if (!ROLES.includes(role)) throw new NotFound(`${role} does not exist`)
    }
  }
  next()
}

module.exports = { verifyRolesExisted }
