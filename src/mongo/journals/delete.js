const deleteJounalEntry = Model => async id => {
  const deleteEntry = await Model.findByIdAndDelete(id)

  if (deleteEntry === null) return {}

  return deleteEntry
}

export { deleteJounalEntry }
