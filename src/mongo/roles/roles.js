const GetRoles = Model => async name => {
  return await Model.find({ name: { $in: [`${name}`] } })
}

const GetRolesDynamic = Model => async roles => {
  const findRoles = await Model.find({ name: { $in: roles } })

  return findRoles
}

const GetRoleWithId = Model => async currentUserRoles => {
  const findRoles = await Model.find({ _id: { $in: currentUserRoles } })
  if (findRoles === null) return []

  return findRoles
}

const CreateRoles = Model => async name => {
  const createRoles = await new Model({ name })
  createRoles.save()

  return createRoles
}
const CountRoles = Model => async () => {
  return await Model.estimatedDocumentCount()
}

module.exports = {
  GetRoles,
  GetRolesDynamic,
  CreateRoles,
  GetRoleWithId,
  CountRoles,
}
