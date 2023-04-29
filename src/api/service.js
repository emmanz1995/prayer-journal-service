import {
  AddJournal,
  UpdateJournal,
  GetJournals,
  GetJournalById,
  DeleteJournal,
} from '../mongo/journal.model'
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
        description: journal.description,
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

const getJournalById = async id => {
  try {
    const getSingleEntry = await GetJournalById(id)
    return getSingleEntry
  } catch (err) {
    console.log(err)
  }
}

const updateJournal = async formData => {
  const { id, title } = formData
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

const deleteJournal = async id => {
  try {
    const removeJournal = await DeleteJournal(id)
    return removeJournal
  } catch (err) {
    console.log(err)
  }
}

export const service = {
  createJournal,
  updateJournal,
  getJournals,
  getJournalById,
  deleteJournal,
}
