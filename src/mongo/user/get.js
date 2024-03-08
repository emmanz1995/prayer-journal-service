const getMultiple = Model => async () => {
  return await Model.find({})
}

const get = Model => async email => {
  return await Model.findOne({ email: email })
}

const getById = Model => async id => {
  const getUser = await Model.findById(id).select({ password: 0 })
  if (getUser === null) return {}

  return getUser
}

module.exports = {
  getMultiple,
  getById,
  get,
}
