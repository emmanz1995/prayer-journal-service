import BadRequest from '../../errors/badRequest'
import _ from 'lodash'

const findUser = Model => async name => {
  const findOwner = await Model.findOne({ name })
  return findOwner
}

const get = Model => async () => {
  const getAccounts = await Model.find({})
  return getAccounts
}

const getById = Model => async id => {
  const getAccountById = await Model.findById(id)
  return getAccountById
}

export { findUser, get, getById }
