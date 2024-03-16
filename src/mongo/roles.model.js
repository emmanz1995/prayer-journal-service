const mongoose = require('mongoose')
const { GetRoles, CreateRoles, CountRoles } = require('./roles/roles')

const ROLES = ['user', 'admin', 'moderator']

const roleSchema = new mongoose.Schema({
  name: String,
})

const Roles = mongoose.model('roles', roleSchema)

const getUserRoles = GetRoles(Roles)
const createUserRoles = CreateRoles(Roles)
const countUserRoles = CountRoles(Roles)

module.exports = { Roles, ROLES, getUserRoles, createUserRoles, countUserRoles }
