/**
 * Query for getting all journals in the collection
 * @param {object} Model
 * @returns retrieved data
 */
const get = Model => async () => {
  const getJournals = await Model.find({})

  if (getJournals === null) return []
  return getJournals
}

/**
 * Query for getting one journal from the collection
 * @param {object} Model
 * @returns retrieved data
 */
const getById = Model => async id => {
  const getAccountById = await Model.findById(id)

  if (getAccountById === null) return {}
  return getAccountById
}

const GetMyPRs = Model => async user => {
  const getPRForLoggedInUser = await Model.find({ postedBy: user })

  if (getPRForLoggedInUser === null) return []
  return getPRForLoggedInUser
}

module.exports = { get, getById, GetMyPRs }
