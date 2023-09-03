const get = Model => async () => {
  const getJournals = await Model.find({})

  if (getJournals === null) return []

  return getJournals
}

const getById = Model => async id => {
  const getAccountById = await Model.findById(id)

  if (getAccountById === null) return {}

  return getAccountById
}

export { get, getById }
