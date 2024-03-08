const saveUser = Model => async payload => {
  const createUser = new Model(payload)

  const newUser = await createUser.save()

  if (newUser === null) return {}

  return newUser
}

const updateUser = Model => async (payload, id) => {}

module.exports = {
  saveUser,
  updateUser,
}
