import {
  AddJournal,
  UpdateJournal,
  GetJournals,
  GetJournalById,
  DeleteJournal,
} from '../mongo/journal.model.js'

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

    return journals
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
  const { id, title, description, completedAt } = formData
  try {
    const updateJournalEntry = await UpdateJournal({
      id,
      title,
      description,
      completedAt
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
