const saveUser = Model => async payload => {
  const createUser = new Model(payload);

  const newUser = await createUser.save();
  console.log('...new user:', newUser)
  return newUser;
}

const updateUser = Model => async (payload, id) => {}

module.exports = {
  saveUser,
  updateUser
}