const mongoose = require('mongoose')

const ROLES = ['user', 'admin', 'moderator'];

const roleSchema = new mongoose.Schema({
  name: String,
})

const Role = mongoose.model('roles', roleSchema)

module.exports = { Role, ROLES };
