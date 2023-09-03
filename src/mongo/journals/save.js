import _ from 'lodash'

const saveJournal = Model => async doc => {
  const newJournalEntry = new Model(doc)
  return await newJournalEntry.save()
}

const updateJournal = Model => async formData => {
  const journalId = _.get(formData, 'id')
  const title = _.get(formData, 'title')
  const description = _.get(formData, 'description')
  const completedAt = _.get(formData, 'completedAt')

  const journal = await Model.findByIdAndUpdate(
    journalId,
    { title, description, completedAt },
    { new: true }
  )
  return journal
}

export { saveJournal, updateJournal }
