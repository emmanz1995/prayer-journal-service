/**
 * Query for deleting an existing journal from the collection
 * @param {object} Model
 * @returns deleted data
 */
const deleteJounalEntry = Model => async id => {
  const deleteEntry = await Model.findByIdAndDelete(id)

  if (deleteEntry === null) return {}

  return deleteEntry
}

module.exports = { deleteJounalEntry }
