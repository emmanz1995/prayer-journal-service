import { AddJournal, UpdateJournal, GetJournals } from '../mongo/journal.model'
import _ from 'lodash'

const createJournal = async formData => {
  try {
    const newJournalEntry = await AddJournal(formData)
    return newJournalEntry
  } catch (err) {
    console.log(err)
  }
}

const getJournals = async () => {
  try {
    const journals = await GetJournals()
    const transformedJournals = _.map(journals, journal => {
      return {
        _id: journal._id,
        title: journal.title,
        journalType: journal.journalType,
        createdAt: journal.createdAt,
        updatedAt: journal.updatedAt,
      }
    })
    return transformedJournals
  } catch (err) {
    console.log(err)
  }
}

const updateJournal = async formData => {
  const { id, title } = formData
  console.log('...FORMDATA2:', formData)
  try {
    const updateJournalEntry = await UpdateJournal({
      id,
      title,
    })
    return updateJournalEntry
  } catch (err) {
    console.log(err)
  }
}

export const service = { createJournal, updateJournal, getJournals }
