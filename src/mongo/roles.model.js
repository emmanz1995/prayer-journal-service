const mongoose = require('mongoose')
const {
  GetRoles,
  GetRolesDynamic,
  GetRoleWithId,
  CreateRoles,
  CountRoles,
} = require('./roles/roles')

const ROLES = ['user', 'admin', 'moderator']

const roleSchema = new mongoose.Schema({
  name: String,
})

const Roles = mongoose.model('roles', roleSchema)

const getUserRoles = GetRoles(Roles)
const getAllRoles = GetRolesDynamic(Roles)
const getRolesWithId = GetRoleWithId(Roles)
const createUserRoles = CreateRoles(Roles)
const countUserRoles = CountRoles(Roles)

module.exports = {
  Roles,
  ROLES,
  getUserRoles,
  getAllRoles,
  getRolesWithId,
  createUserRoles,
  countUserRoles,
}
