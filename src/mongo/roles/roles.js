const GetRoles = Model => async name => {
  return await Model.find({ name: { $in: [`${name}`] } });
}
const CreateRoles = Model => async name => {
  const createRoles = await new Model({ name })
  createRoles.save()

  return createRoles;
}
const CountRoles = Model => async () => {
  return await Model.estimatedDocumentCount()
}

module.exports = { GetRoles, CreateRoles, CountRoles }
