const _ = require('lodash')
const { generateId } = require('../../helpers/generateId')
const { bibleConnector } = require('../../connector')

/**
 * Query for saving a journal to a collection
 * @param {function} Model
 * @returns saved data
 */
const saveJournal = Model => async doc => {
  const newJournalEntry = new Model({
    _id: generateId(25),
    ...doc,
  })
  return await newJournalEntry.save()
}

/**
 * Query for updating an existing journal in the collection
 * @param {object} Model
 * @returns updated data
 */
const updateJournal = Model => async formData => {
  const journalId = _.get(formData, 'id')
  const title = _.get(formData, 'title')

  const journal = await Model.findByIdAndUpdate(
    journalId,
    {
      title,
    },
    { new: true }
  )
  return journal
}

module.exports = { saveJournal, updateJournal }
