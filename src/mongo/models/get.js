import BadRequest from '../../errors/badRequest'
import _ from 'lodash'

const get = Model => async () => {
  const getJournals = await Model.find({})
  return getJournals
}

const getById = Model => async id => {
  const getAccountById = await Model.findById(id)
  return getAccountById
}

export { get, getById }
