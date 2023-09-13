import _ from 'lodash'
import { generateId } from '../../helpers/generateId'

const saveJournal = Model => async doc => {
  const newJournalEntry = new Model({ _id: generateId(25), ...doc })
  return await newJournalEntry.save()
}

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

export { saveJournal, updateJournal }
